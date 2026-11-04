import { test } from 'node:test'
import assert from 'node:assert/strict'
import { menuCategories, menuTranslations } from '../data/client-menu.ts'
import { allergenLegend, printedAllergensByItem } from '../data/menu-allergens.ts'

const category = (id: string) => menuCategories.find(entry => entry.id === id)!
const item = (id: string) => menuCategories.flatMap(entry => entry.items).find(entry => entry.id === id)!

test('the complete 14-symbol legend is retained and all 238 printed marks are assigned to existing dishes', () => {
  assert.equal(allergenLegend.length, 14)
  assert.equal(new Set(allergenLegend.map(symbol => symbol.id)).size, 14)
  const valid = new Set(allergenLegend.map(symbol => symbol.id))
  const printed = Object.entries(printedAllergensByItem)
  assert.equal(printed.length, 94)
  assert.equal(printed.reduce((total, [, marks]) => total + marks!.length, 0), 238)
  for (const [id, marks] of printed) {
    assert.ok(item(id), `Unknown dish: ${id}`)
    assert.deepEqual(item(id).allergens, marks)
    assert.equal(new Set(marks).size, marks!.length)
    marks!.forEach(mark => assert.ok(valid.has(mark), `Unknown symbol: ${mark}`))
  }
  const countMarks = (ids: string[]) => ids.flatMap(id => category(id).items).reduce((total, entry) => total + (entry.allergens?.length ?? 0), 0)
  assert.equal(countMarks(['starters', 'salads']), 52)
  assert.equal(countMarks(['meat', 'fish']), 49)
  assert.equal(countMarks(['pizzas', 'calzones']), 58)
  assert.equal(countMarks(['pasta', 'francesinhas', 'burgers', 'omelettes', 'sandwiches']), 79)
})

test('source markings are transcribed without inferring allergens from ingredients', () => {
  assert.deepEqual(item('p19').allergens, ['gluten', 'crustaceans', 'milk', 'celery'])
  assert.deepEqual(item('fr05').allergens, ['gluten', 'eggs', 'milk', 'mustard', 'sulphites'])
  assert.deepEqual(item('sa02').allergens, ['eggs', 'milk', 'mustard'])
  assert.deepEqual(item('e13').allergens, ['crustaceans', 'milk', 'sulphites'])
  for (const id of ['p23', 'pa08', 'm05', 'm10', 'e21']) assert.equal(item(id).allergens, undefined, `${id} is unmarked in the PDF`)
  for (const symbol of allergenLegend) {
    assert.ok(symbol.label && symbol.en && symbol.fr)
    assert.equal(symbol.viewBox.split(' ').length, 4)
  }
})

test('all sections of the eight-page client menu are represented', () => {
  assert.deepEqual(Object.fromEntries(menuCategories.map(entry => [entry.id, entry.items.length])), {
    starters: 21, salads: 5, meat: 14, fish: 8, pizzas: 24, calzones: 3, pasta: 8,
    francesinhas: 7, burgers: 4, omelettes: 3, sandwiches: 5, sides: 4, extras: 11,
    drinks: 64, wines: 41,
  })
  const items = menuCategories.flatMap(entry => entry.items)
  assert.equal(items.length, 222)
  assert.equal(new Set(items.map(entry => entry.id)).size, items.length)
  for (const entry of items) {
    assert.ok(entry.name.trim())
    if (entry.variants) {
      assert.equal(entry.price, null)
      assert.ok(entry.variants.length >= 2)
      assert.equal(new Set(entry.variants.map(variant => variant.label)).size, entry.variants.length)
      for (const variant of entry.variants) assert.ok(Number.isFinite(variant.price) && variant.price > 0)
    } else assert.ok(typeof entry.price === 'number' && Number.isFinite(entry.price) && entry.price > 0)
    if (entry.priceMax !== undefined) assert.ok(entry.priceMax > entry.price!)
  }
})

test('pizza small/large prices match page 5, including the nonstandard Tomate Presunto large price', () => {
  const expected = [
    [8.5, 11], [9.7, 12.2], [9.4, 11.9], [9.6, 12.1], [9.8, 12.3], [10.5, 13],
    [10.5, 13], [10.7, 13.2], [10.7, 13.2], [11.4, 13.9], [10, 12.5], [11.2, 13.7],
    [8.9, 11.4], [11.5, 14], [11.5, 14], [11.5, 14], [11.2, 13.7], [11.4, 14.4],
    [11.7, 14.2], [12.7, 15.2], [10.1, 12.6], [10.2, 12.7], [13, 15.5], [11.2, 13.7],
  ]
  assert.deepEqual(category('pizzas').items.map(entry => entry.variants!.map(variant => variant.price)), expected)
  assert.deepEqual(category('calzones').items.map(entry => entry.price), [10.3, 12.3, 11.3])
})

test('fish portions, salad range, takeaway prices and supplements retain the printed distinctions', () => {
  assert.deepEqual(['f01', 'f02', 'f03'].map(id => item(id).variants!.map(entry => entry.price)), [[23, 45], [22, 42], [22, 42]])
  assert.equal(item('f06').price, 17.75)
  assert.equal(item('s01').price, 2.6)
  assert.equal(item('s01').priceMax, 4.5)
  assert.deepEqual(['e21', 'a01', 'a02', 'a03', 'a04'].map(id => item(id).variants!.map(entry => entry.price)), [[2, 2.5], [2, 2.5], [3.5, 4], [2, 2.5], [3.5, 4]])
  assert.equal(item('x10').price, 3)
  assert.equal(item('x11').price, 5)
  assert.deepEqual(item('d17').variants!.map(entry => entry.price), [10, 19, 3.5])
  assert.deepEqual(item('w07').variants!.map(entry => entry.price), [1.5, 3, 6])
})

test('wine prices retain page 8 ordering and bottle distinctions', () => {
  assert.deepEqual(category('wines').items.map(entry => entry.price), [
    9, 13, 9.4, 10.5, 13, 8, null, 8.5, 9.5, null, 10, 10, 20, 23, 9, 9, 13, 19,
    18, 6.5, 9, 10, 13, 10, 10, 10.5, 9.5, 10.5, 16.5, 16.5, 10.5, null,
    4, 5.2, 6.7, 17.5, 18.5, 12.5, 12, 35, 16.5,
  ])
})

test('categories, descriptions, serving labels and groups have English and French translations', () => {
  const check = (value: string | undefined) => {
    if (!value || /^[\d,.\sL]+$/.test(value)) return
    assert.ok(menuTranslations[value]?.en, `Missing English: ${value}`)
    assert.ok(menuTranslations[value]?.fr, `Missing French: ${value}`)
  }
  for (const section of menuCategories) {
    check(section.title)
    check(section.subtitle)
    for (const entry of section.items) {
      check(entry.description)
      check(entry.group)
      entry.variants?.forEach(variant => check(variant.label))
    }
  }
})
