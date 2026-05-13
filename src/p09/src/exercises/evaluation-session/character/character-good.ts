/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 06 2026
 * @desc Correccion clase Character para implementar el patron Prototype
 */

export class Character {
  constructor(private readonly name: string, private readonly strength: number) {}

  /**
   * @desc Method clone to implement Prototype design pattern. Creates new Character cloning a previous one
   * @returns {Character} Cloned character
   */
  clone(): Character {
    return new Character(this.name, this.strength);
  }

  /**
   * @desc Prints the information of the character: name and strength
   */
  describe(): void {
    console.log(`Character: ${this.name}, Strength: ${this.strength}`);
  }
}