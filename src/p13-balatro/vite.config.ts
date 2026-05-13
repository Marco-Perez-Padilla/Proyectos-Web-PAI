/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Vite configuration file for the project.
 */

import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/25-26-pai-p13-balatro-Marco-Perez-Padilla/',
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
        p13Hangman: resolve(__dirname, './src/exercises/home-work/balatro.html'),
        p13UML: resolve(__dirname, './src/exercises/home-work/uml/balatro-uml.html'),
        poker1: resolve(__dirname, './src/exercises/Poker1/poker.html'),
        poker2: resolve(__dirname, './src/exercises/Poker2/poker.html')
      }, 
    },
  },
});