-- Postgresql code for creating database, user and granting database permission to user, crating user password

--
create database a3db;
create user a3user;
 grant all privileges on database a3db to a3user;
ALTER USER a3user WITH PASSWORD 'password';


-- creating Table

-- Attributes: Invoice,StockCode,Description,Quantity,InvoiceDate,Price,Customer ID,Country

CREATE TABLE OnlineRetail
(
    Invoice varchar(9),
    StockCode varchar(12),
    Description varchar(35),
    Quantity int,
    InvoiceDate timestamp,
    Price numeric(8, 2),
    Customer_ID int,
    Country varchar(20)
);

\copy OnlineRetail from './online_retail_II_1.csv' delimiter ',' csv;
\copy OnlineRetail from './online_retail_II.csv' delimiter ',' csv;

