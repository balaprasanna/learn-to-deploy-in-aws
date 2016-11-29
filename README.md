# learn-to-deploy-in-aws

## git, nodejs, and mysql needed to run this app
## follow along themg instruction to install git, mysql, nodejs and expose ports in aws
## pull this repo and check for npm and node
## then run the app

``` hostname -f ```

### @prepare-your-system
``` sudo apt-get update ```

``` sudo apt-get upgrade ```

### @to-install-git
``` sudo apt-get install git-all ```


### @to-install
``` sudo apt-get install mysql-server-5.7 ```


### @to-configure-security-stuffs 
``` which mysql_secure_installation ```

``` sudo mysql_secure_installation ```


### @to-start,stop
``` sudo service mysql stop ```

``` sudo service mysql start ```


### @root
``` mysql -u root -p ```
``` create database testdb; ```

``` create database todo; ```


``` use testdb ```

``` use todo ```

``` show grants; ```

``` create user 'testuser'@'localhost' identified by 'password123' ```

``` GRANT ALL PRIVILEGES ON testdb.* TO 'testuser'@'localhost'; ```

``` GRANT ALL PRIVILEGES ON todo.* TO 'testuser'@'localhost'; ```

``` show grants; ```


``` mysql -u testuser -p ```

``` use testdb ```

``` show grants; ```

``` create table customer (customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, first_name TEXT, last_name TEXT); ```

``` CREATE TABLE `todo` ( `id` int(11) NOT NULL AUTO_INCREMENT, `text` varchar(45) DEFAULT NULL, `dueDate` varchar(45) DEFAULT NULL, `dueTime` varchar(45) DEFAULT NULL, `priority` varchar(45) DEFAULT NULL, `done` varchar(45) DEFAULT NULL, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=latin1;```
