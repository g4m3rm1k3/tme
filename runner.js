const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const forbiddenDirs = ["node_modules", "bower_components", "vendor"];
const render = require("./render");

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTest() {
    for (let file of this.testFiles) {
      console.log(chalk.blue(`--- ${file.shortName} ---`));
      global.beforeEaches = [];
      global.render = render;
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };
      global.it = async (desc, fn) => {
        beforeEaches.forEach((func) => func());
        try {
          await fn();
          console.log(chalk.green(`\tOK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, " ");
          console.log(chalk.red(`\tFAIL - ${desc}`));
          console.log(chalk.red("\t", message));
        }
      };
      try {
        require(file.name);
      } catch (err) {
        const message = err.message.replace(/\n/g, " ");
        console.log(chalk.red(`\tX - Err in ${file.name}`));
        console.log(chalk.red("\t", message));
      }
    }
  }
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filePath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filePath, shortName: file });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filePath);
        // console.log(childFiles);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
