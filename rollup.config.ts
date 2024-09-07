/*
 * @Author: kasuie
 * @Date: 2024-08-22 21:13:40
 * @LastEditors: kasuie
 * @LastEditTime: 2024-09-07 18:31:34
 * @Description:
 */
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import replace from "@rollup/plugin-replace";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import dts from "rollup-plugin-dts";

const ENV = process.env.NODE_ENV;
const extensions = [".ts", ".js"];
const external = ["ws"];
export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/index.esm.js",
        format: "es",
        sourcemap: false,
      },
    ],
    plugins: [
      commonjs(),
      babel({
        exclude: "node_modules/**",
        extensions,
        babelHelpers: "bundled",
      }),
      nodeResolve({ browser: true, extensions }),
      typescriptPaths({
        preserveExtensions: true,
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(ENV),
      }),
      json(),
    ],
    external,
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      json(),
      typescriptPaths({
        preserveExtensions: true,
      }),
      dts(),
    ],
  },
]);
