-- Hello DuckDB: basic queries and functions
-- Run this in the SQL editor with DuckDB selected as adapter.

SELECT 'Hello, DuckDB!' AS greeting;

SELECT 1 + 2 AS sum, 10 * 5 AS product;

SELECT current_date AS today, current_timestamp AS now;

-- Stored in the selected database. A named connection keeps it across reloads;
-- the In-memory connection does not. TEMP tables are dropped when the session ends.
CREATE OR REPLACE TABLE sample (id INT, name VARCHAR);
INSERT INTO sample VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Carol');
SELECT * FROM sample;
