#!usr/bin/env node
import inquirer from "inquirer";
//  bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawl of ${amount} successful. Remaining balance is: ${this.balance}`);
        }
        else {
            console.log("insufficient balance");
        }
    }
    // credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`deposit of ${amount} successful. Remaining balance : ${this.balance}`);
    }
    // check balance
    checkBalance() {
        console.log(`current balance: ${this.balance}`);
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const account = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
const customers = [
    new Customer("zakia", "shahan", "female", 27, 3162223334, account[0]),
    new Customer("mehak", "fahad", "female", 26, 3002223334, account[1]),
    new Customer("maida", "hasan", "female", 25, 3132223334, account[2]),
];
// function to interect with bankaccount
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`welcome, ${customer.firstName} ${customer.lastName}! \n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: " Select an operation",
                    choices: ["Deposit", "withdraw", "check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thankyou for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("invalid account number. Please try again!");
        }
    } while (true);
}
service();
