import GetCompanyNames from './GetCompanyNames';

/*
 https://api.gdeltproject.org/api/v2/doc/doc?query=(%20Audigent%20OR%20Freeagent%20OR%20Chip%20OR%20%22Just%20Eat%22)%20sourcelang:English&maxrecords=30&sort=datedesc&format
 https://api.gdeltproject.org/api/v2/doc/doc?query=(%20Audigent%20OR%20Freeagent%20OR%20Chip%20OR%20%22Just%20Eat%22)%20sourcelang:English&maxrecords=30&sort=datedesc&format
*/

const QueryString = (): [string, (string | undefined)[]] => {
  const prefix = `https://api.gdeltproject.org/api/v2/doc/doc?query=(`;
  const suffix = `)%20sourcelang:English&maxrecords=80&sort=HybridRel&DateDesc&format=JSONFeed`;
  let stringBody = '';
  const coNames = GetCompanyNames();
  coNames.forEach((v) => {
    stringBody += `%20${v}%20OR`;
  });
  stringBody = stringBody.slice(0, -2);
  const queryString = `${prefix}${stringBody}${suffix}`;

  return [queryString, coNames];
};

export default QueryString;
