/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 23 2026
 * @desc View layer for the Hangman game. Responsible for rendering the UI and forwarding user actions to the Controller.
 */

import type { IGameState, IGameEventHandler } from './interfaces.js';

const SPANISH_ALPHABET = 'abcdefghijklmnñopqrstuvwxyz';

export class HangmanView {
  private eventHandler: IGameEventHandler | null = null;
  private hangmanImage: HTMLImageElement;
  private wordDisplayContainer: HTMLElement;
  private wrongGuessLabel: HTMLElement;
  private alphabetGridContainer: HTMLElement;
  private messageBox: HTMLElement;
  private newGameButton: HTMLButtonElement;
  private alphabetButtons: HTMLButtonElement[] = [];

  /**
   * @desc Builds the UI inside #app and registers all event listeners.
   * @throws {Error} If no element with id `app` is found in the DOM.
   */
  constructor() {
    const appElement = document.getElementById('app');
    if (!appElement) throw new Error('...');
    // Obtener elementos hijos por ID
    this.hangmanImage = appElement.querySelector('#hangman-image') as HTMLImageElement;
    // ... (validar que existen)
    this.wordDisplayContainer = appElement.querySelector('#word-display')!;
    this.wrongGuessLabel = appElement.querySelector('#wrong-guess-label')!;
    this.alphabetGridContainer = appElement.querySelector('#alphabet-grid')!;
    this.messageBox = appElement.querySelector('#message-box')!;
    this.newGameButton = appElement.querySelector('#new-game-button') as HTMLButtonElement;

    this.buildAlphabetButtons();
    this.registerEventListeners();
    this.registerKeyboardListener();
  }

  /**
   * @desc Registers the controller as the handler for all user-triggered events.
   * @param handler Typically the HangmanController instance.
   */
  setEventHandler(handler: IGameEventHandler): void {
    this.eventHandler = handler;
  }

  /**
   * @desc Fully redraws all dynamic UI elements to reflect the given state.
   * @param state Current game state snapshot from the model.
   */
  render(state: IGameState): void {
    this.renderHangmanImage(state);
    this.renderWordSlots(state);
    this.renderAlphabetButtons(state);
    this.renderWrongGuessLabel(state);
    this.renderMessageBox(state);
  }

  /**
   * @desc Updates the hangman image to match the current wrong guess count.
   * @param state Current game state snapshot.
   */
  private renderHangmanImage(state: IGameState): void {
    const imageIndex = Math.min(state.wrongGuessCount, state.maxWrongGuesses);
    this.hangmanImage.src = `../../../hangman-${imageIndex}.png`;
    this.hangmanImage.alt = `Horca – ${state.wrongGuessCount} error(es)`;
  }

  /**
   * @desc Renders one tag per letter of the secret word, revealed or hidden.
   * @param state Current game state snapshot.
   */
  private renderWordSlots(state: IGameState): void {
    this.wordDisplayContainer.innerHTML = '';
    for (const revealedLetter of state.revealedWord) {
      const slot = document.createElement('span');
      slot.className = revealedLetter === '_'
        ? 'tag is-medium is-light'
        : 'tag is-medium is-primary';
      slot.textContent = revealedLetter === '_' ? ' _ ' : revealedLetter.toUpperCase();
      this.wordDisplayContainer.appendChild(slot);
    }
  }

  /**
   * @desc Updates each alphabet button's color and disabled state.
   * @param state Current game state snapshot.
   */
  private renderAlphabetButtons(state: IGameState): void {
    const isGameOver = state.isWon || state.isLost;
    for (const button of this.alphabetButtons) {
      const letter     = button.dataset['letter'] ?? '';
      const wasGuessed = state.guessedLetters.has(letter);
      const isCorrect  = wasGuessed && state.revealedWord.includes(letter);
      const isWrong    = wasGuessed && !state.revealedWord.includes(letter);

      button.disabled  = wasGuessed || isGameOver;
      button.className = 'button';

      if (isCorrect)    button.classList.add('is-success');
      else if (isWrong) button.classList.add('is-danger');
      else              button.classList.add('is-primary'); // color ULL en reposo
    }
  }

  /**
   * @desc Updates the wrong guess counter label.
   * @param state Current game state snapshot.
   */
  private renderWrongGuessLabel(state: IGameState): void {
     this.wrongGuessLabel.textContent =
      `Errores: ${state.wrongGuessCount} / ${state.maxWrongGuesses}`;
  }

  /**
   * @desc Shows a win/loss notification or hides it during an active game.
   * @param state Current game state snapshot.
   */
  private renderMessageBox(state: IGameState): void {
    if (state.isWon) {
      this.messageBox.textContent = `¡Has ganado! La palabra era: ${state.secretWord.toUpperCase()}`;
      this.messageBox.className = 'notification is-success mt-4';
    } else if (state.isLost) {
      this.messageBox.textContent = `¡Has perdido! La palabra era: ${state.secretWord.toUpperCase()}`;
      this.messageBox.className = 'notification is-danger mt-4';
    } else {
      this.messageBox.textContent = '';
      this.messageBox.className = 'notification is-hidden mt-4';
    }
  }

  /**
   * @desc Creates the alphabet buttons and appends them to the alphabet grid container.
   */
  private buildAlphabetButtons(): void {
    this.alphabetGridContainer.innerHTML = '';
    for (const letter of SPANISH_ALPHABET) {
      const button = document.createElement('button');
      button.className = 'button is-primary';
      button.textContent = letter.toUpperCase();
      button.dataset['letter'] = letter;
      this.alphabetGridContainer.appendChild(button);
      this.alphabetButtons.push(button);
    }
  }

  /**
   * @desc Attaches click handlers to letter buttons and the new game button.
   */
  private registerEventListeners(): void {
    for (const button of this.alphabetButtons) {
      button.addEventListener('click', () => {
        const letter = button.dataset['letter'];
        if (letter) this.eventHandler?.onLetterGuessed(letter);
      });
    }
    this.newGameButton.addEventListener('click', () => {
      this.eventHandler?.onNewGameRequested();
    });
  }

  /**
   * @desc Listens for physical keyboard presses and forwards valid letters.
   */
  private registerKeyboardListener(): void {
    document.addEventListener('keydown', (keyboardEvent: KeyboardEvent) => {
      const pressedKey = keyboardEvent.key.toLowerCase();
      if (SPANISH_ALPHABET.includes(pressedKey)) {
        this.eventHandler?.onLetterGuessed(pressedKey);
      }
    });
  }
}