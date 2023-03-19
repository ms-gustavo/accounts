import chalk from "chalk";
import fs from "fs";
//functions
import deposit from "./deposit.js";
import getAccount from "./getAccount.js";

export default function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black(`Ocorreu um erro, tente novamente mais tarde`)
    );
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
  fs.writeFileSync(
    `./accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta`)
  );
}
