import GetCompanyNames from './GetCompanyNames';

/*
 https://api.gdeltproject.org/api/v2/doc/doc?query=(%20Audigent%20OR%20Freeagent%20OR%20Chip%20OR%20%22Just%20Eat%22)%20sourcelang:English&maxrecords=30&sort=datedesc&format
 https://api.gdeltproject.org/api/v2/doc/doc?query=(%20Audigent%20OR%20Freeagent%20OR%20Chip%20OR%20%22Just%20Eat%22)%20sourcelang:English&maxrecords=30&sort=datedesc&format
*/
function getRandomValuesFromArray(arr: any, count: number) {
  const shuffledArray = arr.slice().sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, count);
}

const QueryString = (): [string, (string | undefined)[]] => {
  const prefix = `https://api.gdeltproject.org/api/v2/doc/doc?query=(`;
  const suffix = `)%20sourcelang:English&maxrecords=100&sort=HybridRel&DateDesc&format=JSONFeed`;
  let stringBody = '';
  let coNames = GetCompanyNames();

  if (coNames.length === 0) {
    return ['no-articles', []];
  } else if (coNames.length === 1) {
    const oneItemPrefix = prefix.slice(0, -1);
    const oneItemSuffix = suffix.slice(1);
    stringBody = `%20${coNames[0]}`;
    const queryString = `${oneItemPrefix}${stringBody}${oneItemSuffix}`;
    return [queryString, coNames];
  } else if (coNames.length > 15) {
    coNames = getRandomValuesFromArray(coNames, 15);
  }

  coNames.forEach((v) => {
    stringBody += `%20${v}%20OR`;
  });
  stringBody = stringBody.slice(0, -2);
  const queryString = `${prefix}${stringBody}${suffix}`;

  return [queryString, coNames];
};

export default QueryString;
