
import * as cheerio  from "cheerio";

const url =
'https://api.gdeltproject.org/api/v2/doc/doc?query=(%20Audigent%20OR%20Freeagent%20OR%20Chip%20OR%20%22Just%20Eat%22)%20sourcelang:English&maxrecords=30&sort=datedesc&format&output=artlist'

  const GetArticles = async (addr) => {
  try{
    const articles = await fetch(addr);
 
    const asJSON = await articles.json()
   
    // const $ =  cheerio.load(asText, null, false)

    // const postTitles = {}

    // $('div#maincontent > a > div > span.arttitle').each((_idx, el)=>{
    //     const postTitle = $(el).text();
    //     const link = $(el).parent().parent().attr('href');
    //     postTitles[postTitle] = link;
    //   })
     return asJSON

  }catch(error){
    console.error('Error from scrapper', error)
  }
  
    /*
      https://api.gdeltproject.org/api/v2/doc/doc?query=(%20Audigent%20OR%20Freeagent%20OR%20Chip%20OR%20%22Just%20Eat%22)%20sourcelang:English&maxrecords=30&sort=datedesc&format
       https://api.gdeltproject.org/api/v2/doc/doc?query=(%20Audigent%20OR%20Freeagent%20OR%20Chip%20OR%20%22Just%20Eat%22)%20sourcelang:English&maxrecords=30&sort=datedesc&format
      */
  
  };

  const titles = await GetArticles(url)
  console.log('Titles \n', titles);