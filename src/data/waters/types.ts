import type { LocalizedText } from '../types'

/** Minimal GeoJSON geometry subset – coordinates are [lng, lat]. */
export interface LineStringGeometry {
  type: 'LineString'
  coordinates: [number, number][]
}

export interface PolygonGeometry {
  type: 'Polygon'
  /** first ring is the outer boundary */
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
  /** geometry is a rough hand-drawn approximation – shown with a hint */
  approximate?: boolean
  geometry: WaterGeometry
}
