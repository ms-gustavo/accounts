//extern modules
import inquirer from "inquirer";
import chalk from "chalk";

// functions
import createAccount from "./account.js";
import buildAccount from "./builder.js";
import deposit from "./deposit.js";
import getAccountBalance from "./getAccountBalance.js";
import withdraw from "./withdraw.js";

export default function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar conta",
          "Consultar saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Criar conta") {
        createAccount();
        buildAccount();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Consultar saldo") {
        getAccountBalance();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black(`Obrigado por usar o Accounts!`));
        process.exit();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

operation();
