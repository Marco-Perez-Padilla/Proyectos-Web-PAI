/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 16 2026
 * @desc Vite configuration file for the project.
 */

import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/25-26-pai-p12-hangman-ghpages-Marco-Perez-Padilla/',
  publicDir: 'public',
  server: {
    open: 'index.html',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        p12Hangman: resolve(__dirname, './src/exercises/home-work/game.html'),
        p12UML: resolve(__dirname, './src/exercises/home-work/uml/hangman-uml.html'),
      },
    },
  },
});