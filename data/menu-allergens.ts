import type { AllergenId } from '@/types'

// These are the actual printed symbols, NOT allergens inferred from recipes.
// Pages 3–6 contain 52, 49, 58 and 79 marks respectively (238 in total).
// An item without marks has no allergen declaration in this source; it is not allergen-free.
export const printedAllergensByItem: Partial<Record<string, AllergenId[]>> = {
  // Page 3: starters and salads.
  e01: ['gluten'], e02: ['gluten'], e03: ['milk'], e04: ['gluten', 'milk'],
  e06: ['gluten', 'eggs', 'milk', 'fish'], e07: ['gluten', 'eggs', 'milk', 'crustaceans'],
  e08: ['gluten', 'eggs', 'milk'], e09: ['gluten', 'milk', 'eggs'], e10: ['eggs', 'gluten'],
  e11: ['gluten', 'milk', 'eggs'], e12: ['gluten', 'milk', 'mustard'], e13: ['crustaceans', 'milk', 'sulphites'],
  e15: ['gluten'], e17: ['gluten', 'milk'], e18: ['gluten', 'milk'], e19: ['milk', 'nuts'], e20: ['milk', 'nuts'],
  s01: ['sulphites'], s02: ['gluten', 'milk'], s03: ['gluten', 'milk', 'sulphites'],
  s04: ['eggs', 'sulphites', 'fish'], s05: ['gluten', 'eggs', 'milk', 'fish'],
  // Page 4: meat and fish. Half/full portions share the same printed marks.
  m01: ['gluten', 'eggs', 'milk', 'sulphites'], m02: ['gluten', 'eggs', 'milk', 'mustard'],
  m03: ['eggs', 'milk', 'sulphites'], m04: ['milk', 'mustard', 'sulphites'],
  m06: ['gluten', 'eggs', 'milk', 'sulphites'], m07: ['gluten', 'milk'], m08: ['gluten', 'milk'],
  m09: ['gluten', 'crustaceans', 'milk', 'sulphites'], m11: ['gluten', 'milk'],
  m12: ['gluten', 'milk'], m13: ['gluten', 'milk'], m14: ['gluten', 'milk', 'sulphites'],
  f01: ['gluten', 'fish', 'milk'], f02: ['fish', 'milk'], f03: ['fish'], f04: ['molluscs'],
  f05: ['molluscs'], f06: ['fish'], f07: ['crustaceans', 'molluscs'], f08: ['gluten', 'fish', 'milk'],
  // Page 5: pizzas and calzones. Pizza Salmão Boss has no symbols in the PDF.
  p01: ['gluten', 'milk'], p02: ['gluten', 'milk'], p03: ['gluten', 'milk'], p04: ['gluten', 'milk'],
  p05: ['gluten', 'milk'], p06: ['gluten', 'milk'], p07: ['gluten', 'milk'], p08: ['gluten', 'milk'],
  p09: ['gluten', 'milk'], p10: ['gluten', 'milk', 'celery'], p11: ['gluten', 'milk'], p12: ['gluten', 'milk'],
  p13: ['gluten', 'milk'], p14: ['gluten', 'milk'], p15: ['gluten', 'crustaceans', 'milk'],
  p16: ['gluten', 'milk'], p17: ['gluten', 'milk'], p18: ['gluten', 'milk'],
  p19: ['gluten', 'crustaceans', 'milk', 'celery'], p20: ['gluten', 'milk'], p21: ['gluten', 'milk'],
  p22: ['gluten', 'milk'], p24: ['gluten', 'milk'],
  c01: ['gluten', 'milk'], c02: ['gluten', 'crustaceans', 'milk'], c03: ['gluten', 'eggs', 'milk'],
  // Page 6: pasta, francesinhas, burgers, omelettes and sandwiches.
  pa01: ['gluten', 'milk'], pa02: ['gluten', 'milk'], pa03: ['gluten'], pa04: ['gluten', 'milk'],
  pa05: ['gluten', 'eggs', 'milk'], pa06: ['gluten'], pa07: ['gluten', 'crustaceans', 'milk'],
  fr01: ['gluten', 'milk', 'mustard', 'celery', 'sulphites'], fr02: ['gluten', 'milk', 'mustard', 'sulphites'],
  fr03: ['gluten', 'eggs', 'milk', 'mustard', 'sulphites'], fr04: ['gluten', 'eggs', 'milk', 'mustard', 'sulphites'],
  fr05: ['gluten', 'eggs', 'milk', 'mustard', 'sulphites'], fr06: ['gluten', 'eggs', 'milk', 'mustard', 'sulphites'],
  fr07: ['gluten', 'eggs', 'milk', 'mustard', 'sulphites'],
  b01: ['gluten', 'eggs', 'milk', 'mustard'], b02: ['gluten', 'eggs', 'milk', 'mustard'],
  b03: ['gluten', 'milk', 'mustard'], b04: ['gluten', 'milk', 'mustard'],
  o01: ['eggs'], o02: ['eggs'], o03: ['gluten', 'eggs', 'milk'],
  sa01: ['gluten'], sa02: ['eggs', 'milk', 'mustard'], sa03: ['gluten'],
  sa04: ['gluten', 'eggs', 'milk'], sa05: ['gluten', 'eggs', 'milk', 'mustard'],
}

// Crop coordinates address the original 480×184 image embedded in PDF page 1.
// The artwork and the original colour coding are preserved, including unused legend entries.
export const allergenLegend: { id: AllergenId; label: string; en: string; fr: string; viewBox: string }[] = [
  { id: 'gluten', label: 'Glúten', en: 'Gluten', fr: 'Gluten', viewBox: '0 0 68 68' },
  { id: 'crustaceans', label: 'Crustáceos', en: 'Crustaceans', fr: 'Crustacés', viewBox: '69 0 68 68' },
  { id: 'eggs', label: 'Ovos', en: 'Eggs', fr: 'Œufs', viewBox: '138 0 68 68' },
  { id: 'fish', label: 'Peixe', en: 'Fish', fr: 'Poisson', viewBox: '206 0 68 68' },
  { id: 'peanuts', label: 'Amendoins', en: 'Peanuts', fr: 'Arachides', viewBox: '275 0 68 68' },
  { id: 'soy', label: 'Soja', en: 'Soy', fr: 'Soja', viewBox: '344 0 68 68' },
  { id: 'milk', label: 'Lácteos', en: 'Milk', fr: 'Lait', viewBox: '413 0 68 68' },
  { id: 'nuts', label: 'Frutos de casca', en: 'Tree nuts', fr: 'Fruits à coque', viewBox: '0 88 68 68' },
  { id: 'celery', label: 'Aipo', en: 'Celery', fr: 'Céleri', viewBox: '69 88 68 68' },
  { id: 'mustard', label: 'Mostarda', en: 'Mustard', fr: 'Moutarde', viewBox: '138 88 68 68' },
  { id: 'sesame', label: 'Grãos de sésamo', en: 'Sesame seeds', fr: 'Graines de sésame', viewBox: '206 88 68 68' },
  { id: 'sulphites', label: 'Dióxido de enxofre e sulfitos', en: 'Sulphur dioxide and sulphites', fr: 'Dioxyde de soufre et sulfites', viewBox: '275 88 68 68' },
  { id: 'molluscs', label: 'Moluscos', en: 'Molluscs', fr: 'Mollusques', viewBox: '344 88 68 68' },
  { id: 'lupin', label: 'Tremoços', en: 'Lupin', fr: 'Lupin', viewBox: '413 88 68 68' },
]

export const allergenTranslations = Object.fromEntries(allergenLegend.map(({ label, en, fr }) => [label, { en, fr }]))
