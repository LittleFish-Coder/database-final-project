
USE DATABASE_FINAL_PROJECT;

-- DESCRIBE BUS;
-- SELECT * FROM BUS LIMIT 1;

-- DESCRIBE TRAIN;
-- SELECT * FROM TRAIN LIMIT 1;

-- DESCRIBE BIKE;
-- SELECT * FROM BIKE LIMIT 1;

-- DESCRIBE TRAIN_NORTH_STATION;
-- SELECT * FROM TRAIN_NORTH_STATION LIMIT 1;

-- DESCRIBE TRAIN_SOUTH_STATION;
-- SELECT * FROM TRAIN_SOUTH_STATION LIMIT 1;

-- DESCRIBE LIKE_BUS;
-- SELECT * FROM LIKE_BUS LIMIT 1;

-- DESCRIBE LIKE_TRAIN;
-- SELECT * FROM LIKE_TRAIN LIMIT 1;

DESCRIBE LIKE_BIKE;
SELECT * FROM LIKE_BIKE;


-- DROP TABLE TRAIN_SOUTH_STATION;

-- CREATE TABLE TRAIN_SOUTH_STATION (
--   station_id INT,
--   train_id INT,
--   order_num INT,
--   arr_time TIME,
--   station_name VARCHAR(50)
-- );

-- DESCRIBE TRAIN_SOUTH_STATION;

-- set global local_infile = 1;
-- LOAD DATA LOCAL INFILE '/Users/fish/Library/CloudStorage/GoogleDrive-e14076423@gs.ncku.edu.tw/我的雲端硬碟/111下/資料庫系統/Final Project/Project/data/train_south_station.csv'
--   INTO TABLE TRAIN_SOUTH_STATION
--   FIELDS TERMINATED BY ','
--   LINES TERMINATED BY '\r\n'
--   IGNORE 1 ROWS;

-- SELECT * FROM TRAIN_SOUTH_STATION LIMIT 10;

-- SELECT *
-- FROM TRAIN_NORTH_STATION
-- WHERE station_name = '新營';

-- train_id start_arr_time	start_station_name destination_arr_time    destination_station_name
-- 3211 14:42:00 新營 15:09:00 善化

-- SELECT t1.train_id, t1.arr_time AS start_arr_time, t1.station_name AS start_station_name, t2.arr_time AS dest_arr_time, t2.station_name AS dest_station_name
-- FROM TRAIN_SOUTH_STATION t1, TRAIN_SOUTH_STATION t2
-- WHERE t1.station_name = '新營' AND t2.station_name = '善化' AND t1.train_id = t2.train_id
-- ORDER BY start_arr_time;

-- DROP TABLE LIKE_BIKE;

-- CREATE TABLE LIKE_BIKE (
--   station_id INT PRIMARY KEY,
--   station_name VARCHAR(255),
--   station_address VARCHAR(255),
--   notes VARCHAR(255) DEFAULT 'No notes'
-- );

-- CREATE TABLE LIKE_TRAIN (
--   train_id INT,
--   start_station VARCHAR(255),
--   destination_station VARCHAR(255),
--   start_time VARCHAR(255),
--   destination_time VARCHAR(255),
--   duration VARCHAR(255)
-- );

-- DESCRIBE LIKE_TRAIN;


-- DELETE FROM LIKE_BIKE
-- WHERE station_id = 501305001;

-- SELECT * FROM LIKE_TRAIN LIMIT 10;


-- UPDATE LIKE_BIKE
-- SET notes = 'test notes'
-- WHERE station_id = 501305001;

-- SHOW PROCESSLIST;
-- KILL 38;

-- CREATE TABLE LIKE_BUS (
--   route_id VARCHAR(50) PRIMARY KEY,
--   route_name VARCHAR(100),
--   type VARCHAR(50),
--   type_zh VARCHAR(50),
--   url VARCHAR(100)
-- );

-- DESCRIBE LIKE_BUS;

-- SELECT * FROM LIKE_BUS LIMIT 10;

