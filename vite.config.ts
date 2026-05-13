import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/2025-2026-pai-integraci-n-continua-2025-2026-pai-integracion-continua/dist/',
  publicDir: false,
  server: {
    open: 'index.html',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, './index.html'),
        p07: resolve(__dirname, './src/p07/index.html'),
        p07Figures: resolve(__dirname, './src/p07/marco-perez-padilla-figures.html'),
        p08: resolve(__dirname, './src/p08/index.html'),
        p08LifeExpectancy: resolve(__dirname, './src/p08/src/home-work/life-expectancy-barchart/marco-perez-padilla-life-expectancy-bar-chart.html'),
        p08UML: resolve(__dirname, './src/p08/src/home-work/common/json-uml.html'),
        p09: resolve(__dirname, './src/p09/public/index.html'),
        p09Functions: resolve(__dirname, './src/p09/src/exercises/home-work/exercise-function-plotter.html'),
        p09UML: resolve(__dirname, './src/p09/src/exercises/home-work/uml/function-plotter-uml.html'),
        p09TwoFunctions: resolve(__dirname, './src/p09/src/exercises/evaluation-session/two-functions/exercise-function-plotter.html'),
        p09TaylorSeries: resolve(__dirname, './src/p09/src/exercises/evaluation-session/taylor-series/exercise-function-plotter.html'),
        p10: resolve(__dirname, './src/p10/public/index.html'),
        p10Projectile: resolve(__dirname, './src/p10/src/exercises/home-work/projectile.html'),
        p10UML: resolve(__dirname, './src/p10/src/exercises/home-work/uml/projectile-uml.html'),
        p10GraphicObject: resolve(__dirname, './src/p10/src/exercises/evaluation-exercise1-title/graphic-object.html'),
      }
    }
  }
});