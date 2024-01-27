-- Executed on DBeaver

-- Get all count data from database
SELECT COUNT(*) FROM absensi.employee_attendance;

-- Delete all data
DELETE FROM absensi.employee_attendance;

-- Set auto_increment to 1
ALTER TABLE absensi.employee_attendance AUTO_INCREMENT=1;
