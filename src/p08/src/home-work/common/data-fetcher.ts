/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Facade over the browser Fetch API to retrieve remote JSON data
 */

/**
 * Facade over the Fetch API that simplifies obtaining JSON data from an arbitrary URL.
 */
export class DataFetcher {
  /**
   * @desc Performs a GET request to the given URL and returns the response
   *       body deserialized as type T. Optionally accepts custom HTTP headers.
   * @param url     - The URL of the resource to fetch.
   * @param headers - Optional map of HTTP headers to include in the request.
   * @returns A promise that resolves with the JSON body typed as T.
   * @throws {Error} If the HTTP response is not successful (status >= 400).
   */
  async fetch<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
    const response = await window.fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch "${url}": HTTP ${response.status} ${response.statusText}`
      );
    }

    return response.json() as Promise<T>;
  }
}