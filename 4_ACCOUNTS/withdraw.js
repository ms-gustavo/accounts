import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import getAccount from "./getAccount.js";
import verifyAccount from "./verifyAccount.js";
import operation from "./index.js";

export default function withdraw() {
  //withdraw an amount from user account

  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!verifyAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "ammount",
            message: "Quanto você deseja sacar?",
          },
        ])
        .then((answer) => {
          const ammount = answer["ammount"];

          removeAmmount(accountName, ammount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmmount(accountName, ammount) {
  const accountData = getAccount(accountName);

  if (!ammount) {
    console.log(
      chalk.bgRed.bnlack(`Ocorreu um erro, tente novamente mais tarde.`)
    );
    return withdraw();
  }

  if (accountData.balance < ammount) {
    console.log(chalk.bgRed.black(`Valor indisponível!`));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(ammount);

  fs.writeFileSync(
    `./accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );
  console.log(
    chalk.green(`Foi realizado um saque de R$${ammount} da sua conta!`)
  );
  operation();
}
