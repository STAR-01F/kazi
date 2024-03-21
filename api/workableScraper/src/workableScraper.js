import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer";

export const workableScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    const pageTitle = (await page.title()).toString();
    const compName = pageTitle.substring(pageTitle.lastIndexOf("-") + 1).trim();

    const header = await page.$eval("header", (el) => {
      let scrapedJob = {};
      scrapedJob["logoLink"] = el.querySelector("img")?.src;
      scrapedJob["title"] = el.querySelector(
        '[data-ui="job-title"]',
      )?.innerHTML;
      scrapedJob["location"] = el.querySelector(
        '[data-ui="job-location"]',
      )?.textContent;
      return scrapedJob;
    });

    const description = await page.$$eval(
      '[data-ui="job-description"] p, [data-ui="job-description"] li',
      (paragraphs) => paragraphs.map((p) => p.textContent),
    );

    const requirements = await page.$$eval(
      '[data-ui="job-requirements"] ul li',
      (reqs) => reqs.map((req) => req.textContent),
    );
    await browser.close();

    const jobData = {
      companyName: compName,
      title: header.title,
      logoLink: header.logoLink,
      location: header.location,
      description: [...description, ...requirements],
    };

    return jobData;
  } catch (error) {
    return error;
  }
};
