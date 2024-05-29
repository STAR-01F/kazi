import { workableScraper } from "./workableScraper.js";

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const { url } = body;

  try {
    const scrapedData = await workableScraper(url);

    if (
      Object.keys(scrapedData).length === 0 ||
      scrapedData.workableDescription.length == 0
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Could not scrape data from url provided",
        }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(scrapedData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
