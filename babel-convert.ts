import * as babel from "@babel/core";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { readFileSync } from "fs";
import { resolve, relative, dirname } from "path";
import * as fs from "fs";
import * as path from "path";
import { errorMonitor } from "events";
import { minify } from "uglify-js";
const convertDir = "./convert",
  convertDistDir = "convert-dist";
async function redDir(dirName: string): Promise<string[]> {
  const dirs: string[] = [];
  return new Promise((resolve, reject) => {
    fs.readdir(dirName, function (err, data) {
      const files = data;
      while (files.length) {
        const file = files.pop();
        if (!file) {
          return;
        }
        dirs.push(file);
      }
      resolve(dirs);
    });
  });
}
async function convertFile(fileName: string): Promise<string> {
  const code = readFileSync(fileName).toString();
  const transformCode = await babel.transform(code, {
    filename: "file.ts",
    presets: ["@babel/preset-env"],
  });
  if (!transformCode || !transformCode.code) {
    throw new Error("convert error");
  }
  return transformCode.code;
}

async function run() {
  const files = await redDir(convertDir);
  if (!files || !files.length) {
    console.error("convert file error");
    return;
  }

  const codes: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const code = await convertFile(path.join(convertDir, files[i]));
    codes.push(code);
  }
  for (let i = 0; i < codes.length; i++) {
    let minifyResult = minify(codes[i]);
    if (minifyResult.error) {
      throw new Error("compress error");
    }
    fs.writeFileSync(path.join(convertDistDir, files[i]), minifyResult.code);
  }
  console.log("convert success");
}
run().catch((e) => {
  console.error(e);
});
