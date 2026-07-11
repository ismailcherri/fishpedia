import type { LocalizedText } from '../types'

/** Minimal GeoJSON geometry subset – coordinates are [lng, lat]. */
export interface LineStringGeometry {
  type: 'LineString'
  coordinates: [number, number][]
}

export interface PolygonGeometry {
  type: 'Polygon'
  /**
   * Rings are rendered with the even-odd rule: further rings are islands
   * (holes) or, for pond chains, separate basins of the same water.
   */
  coordinates: [number, number][][]
}

export type WaterGeometry = LineStringGeometry | PolygonGeometry

export interface WaterArea {
  id: string
  /** display name as printed on the permit */
  name: string
  kind: 'lake' | 'canal' | 'river'
  /** section limits or restrictions from the permit, e.g. "nur Bootsangeln" */
  note?: LocalizedText
  /** geometry contains schematic parts (e.g. an assumed boundary) – shown dashed */
  approximate?: boolean
  geometry: WaterGeometry
}
