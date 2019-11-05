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
    setTimeout(prompt, 200);
});
const prompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(response => {
        switch (response.options) {
            case "View Products for Sale":
                products();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                console.log("Error");
        };
    });
};

const products = () => {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("---------------------------------------------------")
            console.log("ID: " + res[i].id);
            console.log("Name: " + res[i].product_name);
            console.log("Price: " + res[i].price);
            console.log("Quantity: " + res[i].stock_quantity);
        };
    });
    setTimeout(prompt, 200);
};

const lowInventory = () => {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let low = [];
        for (i = 0; i < res.length; i++) {
            if (parseInt(res[i].stock_quantity) <= 5) {
                low.push(res[i]);
            };
        };
        for (i = 0; i < low.length; i++) {
            console.log("---------------------------------------------------")
            console.log("ID: " + low[i].id);
            console.log("Name: " + low[i].product_name);
            console.log("Price: " + low[i].price);
            console.log("Quantity: " + low[i].stock_quantity);
        };
    });
    setTimeout(prompt, 200);
};

const addInventory = () => {
    let itemChoice = "";
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let temp = [];
        for (i = 0; i < res.length; i++) {
            temp.push(res[i].product_name);
        };
        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Which Item?",
                choices: temp
            }
        ]).then(res2 => {
            itemChoice = Object.values(res2);
            console.log(itemChoice[0]);
            inquirer.prompt([
                {
                    type: "input",
                    name: "addQuantity",
                    message: "How Many?"
                }
            ]).then(res3 => {
                connection.query("SELECT * FROM products WHERE product_name = ?", [itemChoice[0]], function (err, res4) {
                    console.log("Adding " + res3.addQuantity + " to " + itemChoice[0]);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (res4[0].stock_quantity += parseInt(res3.addQuantity))
                            },
                            {
                                product_name: itemChoice[0]
                            }
                        ],
                        function (err, res) {
                            console.log(res.affectedRows + " item updated!\n");
                        }
                    )
                    setTimeout(prompt, 200);
                });
            });
        });
    });

};

let proName = "";
let proDept = "";
let proPrice = 0;
let proQuant = 0;
const newProduct = () => {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        let temp = [];
        for (i = 0; i < res.length; i++) {
            temp.push(res[i].department_name);
        };
        inquirer.prompt([
            {
                type: "input",
                name: "item",
                message: "What is the name of the product?"
            }
        ]).then(res => {
            proName = res.item;
            inquirer.prompt([
                {
                    type: "list",
                    name: "dept",
                    message: "What Department?",
                    choices: temp
                }
            ]).then(res => {
                proDept = res.dept;
                inquirer.prompt([
                    {
                        type: "input",
                        name: "price",
                        message: "What is the price?"
                    }
                ]).then(res => {
                    proPrice = res.price;
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "quantity",
                            message: "How many do you have?"
                        }
                    ]).then(res => {
                        proQuant = res.quantity;
                        setTimeout(pushProducts, 100);
                    });
                });
            });
        });
    });
};

const pushProducts = () => {
    connection.query("INSERT INTO products SET ?",
        {
            product_name: proName,
            department_name: proDept,
            price: proPrice,
            stock_quantity: proQuant
        },
        function (err, res) {
            console.log(res.affectedRows + " product inserted!\n")
            setTimeout(prompt, 200);
        });
};
