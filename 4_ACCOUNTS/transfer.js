import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import getAccount from "./getAccount.js";
import verifyAccount from "./verifyAccount.js";
import operation from "./index.js";

export default function transfer() {
  inquirer
    .prompt([
      {
        name: "sourceAccount",
        message: "Qual o nome da sua conta de origem?",
      },
      {
        name: "destinationAccount",
        message: "Qual o nome da conta de destino?",
      },
      {
        name: "amount",
        message: "Quanto você deseja transferir?",
      },
    ])
    .then((answers) => {
      const sourceAccountName = answers["sourceAccount"];
      const destinationAccountName = answers["destinationAccount"];
      const amount = parseFloat(answers["amount"]);

      if (!verifyAccount(sourceAccountName)) {
        console.log(
          chalk.bgRed.black(`A conta de origem não existe, escolha outro nome!`)
        );
        return transfer();
      }

      if (!verifyAccount(destinationAccountName)) {
        console.log(
          chalk.bgRed.black(
            `A conta de destino não existe, escolha outro nome!`
          )
        );
        return transfer();
      }

      const sourceAccount = getAccount(sourceAccountName);
      const destinationAccount = getAccount(destinationAccountName);

      if (sourceAccount.balance < amount) {
        console.log(
          chalk.bgRed.black(`A conta de origem não tem saldo suficiente!`)
        );
        return transfer();
      }

      sourceAccount.balance -= amount;
      destinationAccount.balance += amount;

      fs.writeFileSync(
        `./accounts/${sourceAccountName}.json`,
        JSON.stringify(sourceAccount),
        (err) => console.log(err)
      );
      fs.writeFileSync(
        `./accounts/${destinationAccountName}.json`,
        JSON.stringify(destinationAccount),
        (err) => console.log(err)
      );

      console.log(
        chalk.green(
          `Foram transferidos R$${amount} da conta ${sourceAccountName} para a conta ${destinationAccountName}.`
        )
      );
      operation();
    })
    .catch((err) => console.log(err));
}
