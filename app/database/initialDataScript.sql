INSERT into SystemConfig (BrandName, TradeMarkName)
values("TS LTD", "Thomas Senior");

-- Script will need to be altered as per SHA256 for password
INSERT INTO Users (username, password, admin, locked)
VALUES ("Tom", "2161403032b8314a5249774f9418acf04317a84cc1dddba989d108e763d557ac", "0", "0");
-- Non Admin User
INSERT INTO Users (username, password, admin, locked)
VALUES ("QA", "48947c06d09a212ca1dcfbdf5a63d18dde8c964dbc66eea033a363eee856de21", "1", "0");

INSERT into Settings(Code, Active, Description)
VALUES('Admin', '0', 'Privilege to enable the archive section');