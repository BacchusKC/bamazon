const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Pennylane23!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    buyItem();
});

let itemChoice = "";
let itemPrices = 0;
const buyItem = () => {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let temp = [];
        for (i = 0; i < res.length; i++) {
            if (res[i].stock_quantity > 0) {
                temp.push(res[i].product_name + ": $" + res[i].price);
            } else {
                temp.push(res[i].product_name + ": Sold Out")
            };
        };
        inquirer.prompt([
            {
                type: "list",
                name: "itemChoice",
                message: "Which Item Would You Like to Buy?",
                choices: temp
            }
        ]).then(response => {
            itemChoice = Object.values(response);
            let temp = itemChoice[0].split(":");
            console.log(temp[0]);
            connection.query("SELECT * FROM products WHERE product_name = ?", [temp[0]], function (err, res2) {

                if (err) throw err;
                console.log(res2[0].stock_quantity + " Item(s) in Stock");

                inquirer.prompt([
                    {
                        type: "input",
                        name: "quantity",
                        message: "How Many?",
                    }
                ]).then(response => {
                    console.log(response.quantity);
                    if (response.quantity <= res2[0].stock_quantity && response.quantity > 0) {
                        let subtotal = res2[0].price * parseInt(response.quantity);
                        itemPrices += subtotal;
                        console.log("Your Subtotal is: " + itemPrices.toFixed(2));
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: (res2[0].stock_quantity -= response.quantity)
                                },
                                {
                                    product_name: temp[0]
                                }
                            ],
                            function (err, res) {
                                // console.log(res.affectedRows + " items updated!\n");
                            }
                        );
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    product_sales: (res2[0].product_sales += subtotal)
                                },
                                {
                                    product_name: temp[0]
                                }
                            ],
                            function (err, res) {

                            }
                        );
                        setTimeout(buyMore,200);
                    } else {
                        console.log("We Can't Fulfill That Order!");
                        buyItem();
                    };
                });
            });
        });
    });
};

const buyMore = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "more",
            message: "Would You Like to Add More Items to Your Cart?",
            default: false
        }
    ]).then(response => {
        if (response.more) {
            buyItem();
        } else {
            var tax = parseFloat(itemPrices) * 0.089;
            var total = parseFloat(itemPrices) + parseFloat(tax.toFixed(2));
            console.log("Subtotal: $" + itemPrices.toFixed(2));
            console.log("Tax: $" + tax.toFixed(2));
            console.log("Total: $" + total.toFixed(2));
            connection.end();
        };
    });
};