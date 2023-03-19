import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

//functions
import operation from "./index.js";

export default function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);
      if (!fs.existsSync("accounts")) {
        fs.mkdir("accounts", (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      }
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black(`Esta conta já existe, escolha outro nome.`)
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        (err) => {
          console.log(err);
        }
      );

      console.log(chalk.green(`Parabéns, a sua conta foi criada!`));
      operation();
    })
    .catch((err) => console.log(err));
}
