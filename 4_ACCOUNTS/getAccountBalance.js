import chalk from "chalk";
import inquirer from "inquirer";
import getAccount from "./getAccount.js";
import verifyAccount from "./verifyAccount.js";
import operation from "./index.js";

export default function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      //verify if account Exists
      if (!verifyAccount(accountName)) {
        return getAccountBalance();
      }
      const accountData = getAccount(accountName);
      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${accountData.balance}`
        )
      );
      operation();
    })
    .catch((err) => console.log(err));
}
