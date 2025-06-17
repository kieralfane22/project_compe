@echo off
set DATE=%DATE:~10,4%-%DATE:~4,2%-%DATE:~7,2%
mysqldump -u root -proot dental_clinic > backups\dental_backup_%DATE%.sql
