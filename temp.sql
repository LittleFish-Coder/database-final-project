
USE DATABASE_FINAL_PROJECT;

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

-- UPDATE LIKE_BIKE
-- SET notes = 'test notes'
-- WHERE station_id = 501305001;

-- SHOW PROCESSLIST;
-- KILL 38;

