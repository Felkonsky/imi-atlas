// @ts-nocheck

/**
 * Asynchronously fetches data from a specified URL. Checks session storage for cached data and retrieves it if available, otherwise it fetches data from the API and stores it in session storage.
 * @async
 * @function fetchData
 * @param {string} url - The API endpoint URL from which data is to be fetched.
 * @param {string} [sessionCacheKey='initialData'] - The session storage key used to cache the data.
 * @returns {Promise<Array<InteractiveMuseumInstallation>|[]>} Resolves with the fetched data as an array of Interactive Media Installations if successful,
 * or an empty array if the fetch fails.
 */
export async function fetchData(url, sessionCacheKey = 'initialData') {
  // Helper function to retrieve and parse session data (cache)
  const getCachedData = () => {
    const cache = sessionStorage.getItem(sessionCacheKey);
    if (cache) {
      console.info(`Data loaded from session cache with key: ${sessionCacheKey}`);
      try {
        return JSON.parse(cache);
      } catch (e) {
        console.error(`Session cache data is corrupted for key "${sessionCacheKey}", clearing session cache.`, e);
        sessionStorage.removeItem(sessionCacheKey);
        return null;
      }
    }
    console.info(`No data in session cache with key: ${sessionCacheKey}`);
    return null;
  };

  // Check for cached session data
  const cachedData = getCachedData();
  if (cachedData !== null) return cachedData;

  // Fetch data from the API if there is no data cached
  try {
    const response = await fetch(url);
    console.info(`Fetching data from the API at ${url}.`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    sessionStorage.setItem(sessionCacheKey, JSON.stringify(data));
    return data;
  } catch (e) {
    console.error(`An error occurred fetching data from the API at ${url}: `, e);
    return [];
  }
}
