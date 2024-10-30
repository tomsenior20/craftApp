INSERT into SystemConfig (BrandName, TradeMarkName)
values("TS LTD", "Thomas Senior");

-- Script will need to be altered as per SHA256 for password
INSERT INTO Users (username, password, admin, locked)
VALUES ("Tom", "92613a8f434050ae2844559d6df9d15800525cec498c1388f67c2d41c4d694b7", "0", "0");

INSERT into Settings(Code, Active, Description)
VALUES('Admin', '0', 'Privilege to enable the archive section');