-- Hello CereusDB (Apache SedonaDB / DataFusion spatial SQL)
-- Select any CereusDB engine in the SQL editor, then run this script.

SELECT ST_AsText(ST_Point(0, 0)) AS origin;

SELECT ST_AsText(ST_Buffer(ST_Point(0, 0), 1.0)) AS buffered_disc;

SELECT ST_Area(ST_Buffer(ST_Point(10, 10), 2.0)) AS buffer_area;
