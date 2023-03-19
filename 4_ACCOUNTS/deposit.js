import chalk from "chalk";
import inquirer from "inquirer";
//functions
import addAmount from "./addAmount.js";
import verifyAccount from "./verifyAccount.js";
import operation from "./index.js";

export default function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      //verify if account exists
      if (!verifyAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "ammount",
            message: "Quanto você deseja depositar?",
          },
        ])
        .then((answer) => {
          const ammount = answer["ammount"];
          //add an ammount
          addAmount(accountName, ammount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
