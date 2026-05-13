/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Helper class for DOM manipulation, keeping the View SRP‑compliant.
 */

export class HtmlElementManager {
  /**
   * @desc Retrieves an HTML element by its id.
   * @param id - Element id.
   * @returns {HTMLElement} The found element.
   * @throws {Error} If not found.
   */
  getElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Element '${id}' not found`);
    return element;
  }

  /**
   * @desc Sets the text content of an element.
   * @param id - Element id.
   * @param text - Text to display.
   */
  setTextContent(id: string, text: string): void {
    this.getElement(id).textContent = text;
  }

  /**
   * @desc Enables or disables a button.
   * @param id - Button id.
   * @param disabled - True to disable.
   */
  setButtonDisabled(id: string, disabled: boolean): void {
    (this.getElement(id) as HTMLButtonElement).disabled = disabled;
  }
}