import fs from "fs";
import chalk from "chalk";

export default function verifyAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black(`Esta conta não existe, escolha outro nome!`)
    );
    return false;
  }
  return true;
}
