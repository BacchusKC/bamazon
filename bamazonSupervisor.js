const mysql = require("mysql");
const inquirer = require("inquirer");
var columnify = require('columnify');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
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
            choices: ["View Product Sales by Department", "Create New Department", "Delete Department", "Exit"]
        }
    ]).then(response => {
        switch (response.options) {
            case "View Product Sales by Department":
                sales();
                break;
            case "Create New Department":
                createDept();
                break;
            case "Delete Department":
                deleteDept();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                console.log("Error");
        };
    });
};

const sales = () => {
    var query =
        "SELECT d.*, IFNULL(SUM(p.product_sales),0) AS department_sales,(IFNULL(SUM(p.product_sales),0) - d.over_head_costs) AS profit ";
    query +=
        "FROM departments AS d LEFT JOIN products AS p ON d.department_name = p.department_name GROUP BY d.department_name";
    connection.query(query, function (err, res) {
        console.log(res);
        
        // let data = JSON.parse(JSON.stringify(res));
        // let data2 = columnify(data, {
        //     columnSplitter: ' | '
        // });
        // console.log(data2);
    });
    setTimeout(prompt, 500);
};

const createDept = () => {
    let deptName = "";
    let overHead = 0;
    inquirer.prompt([
        {
            type: "imput",
            name: "dept",
            message: "What is the name of the new department?"
        }
    ]).then(response => {
        deptName = response.dept;
        inquirer.prompt([
            {
                type: "imput",
                name: "over",
                message: "What is the overhead cost?"
            }
        ]).then(response => {
            overHead = response.over;
            connection.query("INSERT INTO departments SET ?",
                {
                    department_name: deptName,
                    over_head_costs: overHead
                },
                function (err, res) {
                    console.log(res.affectedRows + " product inserted!\n")
                    setTimeout(prompt, 500);
                });
        })
    })
};

const deleteDept = () => {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        let temp = [];
        for (i = 0; i < res.length; i++) {
            temp.push(res[i].department_name);
        };
        inquirer.prompt([
            {
                type: "list",
                name: "dept",
                message: "Which department to delete?",
                choices: temp
            }
        ]).then(response => {
            connection.query(
                "DELETE FROM departments WHERE ?",
                {
                    department_name: response.dept
                },
                function (err, res) {
                    console.log(res.affectedRows + " products deleted!\n");
                    setTimeout(prompt, 500);
                }
            );
        });
    });
};


