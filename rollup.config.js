import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import sccs from 'rollup-plugin-scss';
import dts from 'rollup-plugin-dts';
import { mkdirSync, writeFileSync } from 'fs';

const packageJson = require('./package.json');

export default [
  {
    input: 'lib/index.ts',
    external: ['react', 'react-dom'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'lib/styles/index.scss',
    plugins: [
      sccs({
        output: (styles) => {
          const dirStyles = `dist/styles`;
          const bundle = `${dirStyles}/bundle.css`;

          mkdirSync(dirStyles, { recursive: true });
          writeFileSync(bundle, styles);
        },
        failOnError: true,
        runtime: require('sass'),
      }),
    ],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
