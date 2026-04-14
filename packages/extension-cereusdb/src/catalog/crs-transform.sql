-- CRS reprojection via PROJ (CereusDB standard, global, or full — not in minimal)

SELECT ST_AsText(ST_Transform(
  ST_GeomFromWKT('POINT(13.4 52.5)'),
  'EPSG:4326',
  'EPSG:3857'
)) AS web_mercator;
