
-- This file contains the initial commands I used to create the tables and add initial data.

CREATE TABLE IF NOT EXISTS user_data (
id          INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
title       VARCHAR(5),
first_name  VARCHAR(40) NOT NULL,
surname     VARCHAR(40) NOT NULL,
mobile      INT(12) UNSIGNED NOT NULL,
email       VARCHAR(40) NOT NULL );

INSERT INTO user_data (id,title,first_name,surname,mobile,email) VALUES
    (NULL,"Mr","Peter","Parker",61899568,"peter.parker@gmail.com");

INSERT INTO user_data (id,title,first_name,surname,mobile,email) VALUES
    (NULL,"Ms","Amy","White",78897468,"amy.white@gmail.com");

INSERT INTO user_data (id,title,first_name,surname,mobile,email) VALUES
    (NULL,"Miss","Laura","Jimenez",78897468,"laura.jimenez@gmail.com");

CREATE TABLE IF NOT EXISTS user_home_address (
    id                  INT(6) UNSIGNED  PRIMARY KEY,
    address_line_1      VARCHAR(40) NOT NULL,
    address_line_2      VARCHAR(40),
    town                VARCHAR(40) NOT NULL,
    county              VARCHAR(40) NOT NULL,
    eircode             VARCHAR(40),
    CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES user_data(id) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO user_home_address (id,address_line_1,address_line_2,town,county,eircode) VALUES
    (1,"57 Rail Park","Greenfield","Maynooth","Kildare","W23 Y2F4");
INSERT INTO user_home_address (id,address_line_1,address_line_2,town,county,eircode) VALUES
    (2,"45 Straffan Road","Old Rail","Lucan","Kildare","W27 Y2U8");
INSERT INTO user_home_address (id,address_line_1,address_line_2,town,county,eircode) VALUES
    (3,"25 Monasterio","Iranzu","Dublin","Dublin","W24 G3F4");


CREATE TABLE IF NOT EXISTS user_shipping_address (
id                  INT(6) UNSIGNED PRIMARY KEY,
address_line_1      VARCHAR(40) NOT NULL,
address_line_2      VARCHAR(40),
town                VARCHAR(40) NOT NULL,
county              VARCHAR(40) NOT NULL,
eircode             VARCHAR(40),
CONSTRAINT fk_id_h FOREIGN KEY (id) REFERENCES user_data(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO user_shipping_address (id,address_line_1,address_line_2,town,county,eircode) VALUES
    (1,"57 Rail Park","Greenfield","Maynooth","Kildare","W23 Y2F4");
INSERT INTO user_shipping_address (id,address_line_1,address_line_2,town,county,eircode) VALUES
    (2,"34 Lucan Road","Lok","Lucan","Kildare","W22 P8H5");
INSERT INTO user_shipping_address (id,address_line_1,address_line_2,town,county,eircode) VALUES
    (3,"25 Monasterio","Iranzu","Dublin","Dublin","W24 G3F4");
