import chalk from "chalk";
import fs from "fs";
//functions
import deposit from "./deposit.js";
import getAccount from "./getAccount.js";

export default function addAmount(accountName, ammount) {
  const accountData = getAccount(accountName);

  if (!ammount) {
    console.log(
      chalk.bgRed.black(`Ocorreu um erro, tente novamente mais tarde`)
    );
    return deposit();
  }

  accountData.balance = parseFloat(ammount) + parseFloat(accountData.balance);
  fs.writeFileSync(
    `./accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.green(`Foi depositado o valor de R$${ammount} na sua conta`)
  );
}
