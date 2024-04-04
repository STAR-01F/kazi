const showPreciseFeed = (arrofNews: any[], conames: (string | undefined)[]) => {
  const result = arrofNews.reduce((filteredItems, arr) => {
    const matchingStrings: any[] = [];

    conames.forEach((subs) => {
      if (subs) {
        const titleLower = (arr['title'] as string).toLowerCase();
        const urlLower = (arr['url'] as string).toLowerCase();
        const subsLower = subs!.toLowerCase();
        if (titleLower.includes(subsLower) || urlLower.includes(subsLower)) {
          matchingStrings.push(subs);
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
