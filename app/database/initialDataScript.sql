INSERT into SystemConfig (BrandName, TradeMarkName)
values("TS LTD", "Thomas Senior");

-- Script will need to be altered as per SHA256 for password
INSERT INTO Users (username, password, admin, locked)
VALUES ("Tom", "2161403032b8314a5249774f9418acf04317a84cc1dddba989d108e763d557ac", "0", "0");

INSERT into Settings(Code, Active, Description)
VALUES('Admin', '0', 'Privilege to enable the archive section');