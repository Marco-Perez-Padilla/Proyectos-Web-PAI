import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Proyectos-Web-PAI/dist/',
  publicDir: false,
  server: {
    open: 'index.html',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Índice principal del monorepo
        index: resolve(__dirname, './index.html'),

        // Práctica 07
        p07: resolve(__dirname, './src/p07/index.html'),
        p07Figures: resolve(__dirname, './src/p07/marco-perez-padilla-figures.html'),

        // Práctica 08
        p08: resolve(__dirname, './src/p08/index.html'),
        p08LifeExpectancy: resolve(__dirname, './src/p08/src/home-work/life-expectancy-barchart/marco-perez-padilla-life-expectancy-bar-chart.html'),
        p08UML: resolve(__dirname, './src/p08/src/home-work/common/json-uml.html'),

        // Práctica 09
        p09: resolve(__dirname, './src/p09/public/index.html'),
        p09Functions: resolve(__dirname, './src/p09/src/exercises/home-work/exercise-function-plotter.html'),
        p09UML: resolve(__dirname, './src/p09/src/exercises/home-work/uml/function-plotter-uml.html'),
        p09TwoFunctions: resolve(__dirname, './src/p09/src/exercises/evaluation-session/two-functions/exercise-function-plotter.html'),
        p09TaylorSeries: resolve(__dirname, './src/p09/src/exercises/evaluation-session/taylor-series/exercise-function-plotter.html'),

        // Práctica 10
        p10: resolve(__dirname, './src/p10/public/index.html'),
        p10Projectile: resolve(__dirname, './src/p10/src/exercises/home-work/projectile.html'),
        p10UML: resolve(__dirname, './src/p10/src/exercises/home-work/uml/projectile-uml.html'),

        // Práctica 11
        p11: resolve(__dirname, './src/p11/public/index.html'),
        p11Lissajous: resolve(__dirname, './src/p11/src/exercises/home-work/lissajous.html'),
        p11UML: resolve(__dirname, './src/p11/src/exercises/home-work/uml/lissajous-uml.html'),

        // Práctica 12 - CORREGIDO según estructura real
        p12: resolve(__dirname, './src/p12/index.html'),
        p12Game: resolve(__dirname, './src/p12/src/exercises/home-work/game.html'),
        p12UML: resolve(__dirname, './src/p12/src/exercises/home-work/uml/hangman-uml.html'),

        // Práctica 13 - CORREGIDO según estructura real
        p13: resolve(__dirname, './src/p13/index.html'),
        p13Balatro: resolve(__dirname, './src/p13/src/exercises/home-work/balatro.html'),
        p13UML: resolve(__dirname, './src/p13/src/exercises/home-work/uml/balatro-uml.html'),
        p13Poker1: resolve(__dirname, './src/p13/src/exercises/Poker1/poker.html'),
        p13Poker2: resolve(__dirname, './src/p13/src/exercises/Poker2/poker.html'),
      },
    },
  },
});