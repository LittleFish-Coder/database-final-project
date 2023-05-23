LOAD DATA LOCAL INFILE '/Users/fish/Library/CloudStorage/GoogleDrive-e14076423@gs.ncku.edu.tw/我的雲端硬碟/111下/資料庫系統/Final Project/Project/data/bus.csv'
    INTO TABLE BUS
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;