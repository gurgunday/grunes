import { readFileSync } from "node:fs";

const readFileSyncOptions = { encoding: "utf8" };

const fileCache = new Map();

/**
 * @param {string} path
 * @returns {string}
 * @throws {Error}
 */
const includeFile = (path) => {
  const pathString = `${path}`;
  let file = fileCache.get(pathString);

  if (file === undefined) {
    file = readFileSync(pathString, readFileSyncOptions);
    fileCache.set(pathString, file);
  }

  return file;
};

export { includeFile };
