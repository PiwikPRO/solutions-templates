interface Window {
  _paq: Array<string[]>
  sevenTag: any
  heatmapEvent: Event
  PPASHeatmapClickEvent: Event
}

interface Replacement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

declare const PP_REPLACEMENT: Replacement;
