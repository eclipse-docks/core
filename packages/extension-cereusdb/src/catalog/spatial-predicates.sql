-- GEOS-backed spatial predicates (available from CereusDB minimal onward)

SELECT ST_Intersects(
  ST_GeomFromWKT('POLYGON ((0 0, 2 0, 2 2, 0 2, 0 0))'),
  ST_GeomFromWKT('POLYGON ((1 1, 3 1, 3 3, 1 3, 1 1))')
) AS intersects;

SELECT ST_Contains(
  ST_GeomFromWKT('POLYGON ((0 0, 4 0, 4 4, 0 4, 0 0))'),
  ST_GeomFromWKT('POINT (1 1)')
) AS contains_point;

SELECT ST_DWithin(
  ST_GeomFromWKT('POINT (0 0)'),
  ST_GeomFromWKT('POINT (3 4)'),
  6.0
) AS within_distance;
