export const convertLink = (market: any, query: string): string => {
    if (!market?.searchUrl || !query) return '';

    const formattedQuery = query.trim().split(/\s+/).join(market.separator || '+');

    return market.searchUrl.replace('${text}', formattedQuery);
};
