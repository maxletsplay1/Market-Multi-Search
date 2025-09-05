export const convertLink = (market: any, query: string): string => {
    if (!market?.searchUrl || !query) return '';

    const formattedQuery = query.trim().split(/\s+/).join(market.separator || '+');

    return market.searchUrl.replace('${text}', formattedQuery);
};

export const parseLink = (query: string): string[] => {
    let separator: string | null = null;

    if (query.includes('xyz%20xyz')) {
        separator = '%20';
    } else if (query.includes('xyz+xyz')) {
        separator = '+';
    } else {
        return ['', ''];
    }

    const replaced = query.replace(`xyz${separator}xyz`, '${text}');
    return [replaced, separator];
};
