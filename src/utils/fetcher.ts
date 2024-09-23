class FetcherError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetcherError";
  }
}

export const fetcher = async (url: string, initArgs: RequestInit = {}) => {
  const response = await fetch(url, initArgs);

  if (!response.ok) {
    throw new FetcherError(`Failed to fetch ${url}`);
  }

  return response.json();
};
