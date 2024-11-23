export const getQuery = (query: string) => (query ? `/paged?${query}` : '')
