# Bamazon

* This is a Node ordering/shopping system with customer and manager functions.

1. This app uses:

    * [mysql](https://www.npmjs.com/package/mysql)

    * [Inquirer](https://www.npmjs.com/package/inquirer)

    * [Columnify](https://www.npmjs.com/package/columnify)

2. Image/gif of app in use:

    * [bamazonCustomer.js Gif](assets/customer.gif)

    * [bamazonManager.js Gif](assets/manager.gif)

    * [bamazonSupervisor.js Gif](assets/supervisor.gif)

3. bamazonCustomer.js can:

    * Select from a list of available products.

    * Buy products that are available.

    * Let you know when an item is sold out.

    * Depletes inventory in Mysql database in real time.

4. bamazonManager.js can:

    * See current inventory.

    * See inventory that is low (5 or less).

    * Add to inventory.

    * Add new products.

    * All add functions add to Mysql database.

5. bamazonSupervisor.js can: 

    * See a table with sales by department, cost and profit.

    * Add a new department.

    * Delete a department.

![Bamazon](/assets/bamazon.png)
