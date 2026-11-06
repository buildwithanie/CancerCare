# CancerCare — Step 6: Embu map and numberless homepage

The homepage no longer shows sequence numbers in the priorities, planned focus cards, or Embu pilot actions. The actions remain a list, with simple visual marks.

The Embu pilot section now includes a static SVG map. The large shape is Embu County; the small Kenya map highlights Embu among the 47 counties. The map does not mark facilities or imply that CancerCare currently provides a local service.

## Boundary source and use

- Dataset: geoBoundaries gbOpen, Kenya ADM1 (Counties), boundary ID KEN-ADM1-32016919.
- Embu feature: shapeName Embu, shapeISO KE-06.
- Year represented: 2020; geoBoundaries build date: 12 December 2023.
- Metadata: https://www.geoboundaries.org/api/current/gbOpen/KEN/ADM1/
- Source geometry: the simplified GeoJSON URL returned in the metadata at revision 9469f09 of the geoBoundaries repository.
- gbOpen is CC BY 4.0. The map card displays a linked geoBoundaries attribution.

The GeoJSON was converted into a self-contained 20 KB SVG at public/embu-county-map.svg. The source geometry is not needed at runtime. To regenerate it, download the simplified GeoJSON from the metadata URL and run:

```sh
node scripts/generate-embu-map.mjs path/to/geoBoundaries-KEN-ADM1_simplified.geojson
```

The map has translated alternative text and labels in English and Kiswahili. Desktop and phone layouts were checked in both languages, and the TypeScript production build passed.
