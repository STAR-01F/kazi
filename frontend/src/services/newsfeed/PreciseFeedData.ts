const showPreciseFeed = (arrofNews: any[], conames: (string | undefined)[]) => {
  const subArray: {[key: string]: number} = {};

  const result = arrofNews.reduce((filteredItems, arr) => {
    const matchingStrings: any[] = [];

    conames.forEach((subs) => {
      if (subs) {
        const titleLower = (arr['title'] as string).toLowerCase();
        const urlLower = (arr['url'] as string).toLowerCase();
        const subsLower = subs!.toLowerCase();
        subArray[subs] = subArray[subs] || 0;

        if (
          (titleLower.includes(subsLower) || urlLower.includes(subsLower)) &&
          subArray[subs] < 7
        ) {
          matchingStrings.push(subs);
          subArray[subs] += 1;
        }
      }
    });

    if (matchingStrings.length > 0) {
      filteredItems.push({item: arr, matchingStrings});
    }

    return filteredItems;
  }, []);

  return result;
};

export {showPreciseFeed};
