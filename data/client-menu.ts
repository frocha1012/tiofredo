import type { MenuCategory, MenuItem } from '@/types'
import { printedAllergensByItem } from './menu-allergens.ts'

// Transcribed from the client's eight-page “Ementa Tio Fredo Julho 2026” PDF.
// Amounts are in EUR. Serving sizes and takeaway prices are kept as printed.
type Text = [pt: string, en: string, fr: string]
export const menuTranslations: Record<string, { en: string; fr: string }> = {}
function text(value: Text) {
  const [pt, en, fr] = value
  menuTranslations[pt] = { en, fr }
  return pt
}
const small = text(['Pequena (P)', 'Small (P)', 'Petite (P)'])
const large = text(['Grande (G)', 'Large (G)', 'Grande (G)'])
const half = text(['½ dose', 'Half portion', 'Demi-portion'])
const full = text(['1 dose', 'Full portion', 'Portion entière'])
const dineIn = text(['No restaurante', 'Dine-in', 'Sur place'])
const takeaway = text(['Take away', 'Takeaway', 'À emporter'])
const glass = text(['Taça', 'Glass', 'Verre'])
const sizes = (p: number, g: number) => [{ label: small, price: p }, { label: large, price: g }]
const portions = (p: number, g: number) => [{ label: half, price: p }, { label: full, price: g }]
const service = (p: number, g: number) => [{ label: dineIn, price: p }, { label: takeaway, price: g }]
const sangria = (one: number, two: number, cup?: number) => [
  { label: '1 L', price: one }, { label: '2 L', price: two },
  ...(cup === undefined ? [] : [{ label: glass, price: cup }]),
]
const houseWine = () => [{ label: glass, price: 1.5 }, { label: '0,5 L', price: 3 }, { label: '1 L', price: 6 }]
function item(id: string, name: Text | string, price: number | MenuItem['variants'], description?: Text, options: Partial<MenuItem> = {}): MenuItem {
  return { id, name: typeof name === 'string' ? name : text(name), price: typeof price === 'number' ? price : null,
    ...(Array.isArray(price) ? { variants: price } : {}),
    ...(description ? { description: text(description) } : {}),
    ...(printedAllergensByItem[id] ? { allergens: [...printedAllergensByItem[id]] } : {}), ...options }
}
function group(title: Text, items: MenuItem[]) {
  const label = text(title)
  return items.map(entry => ({ ...entry, group: label }))
}
function category(id: string, title: Text, items: MenuItem[], subtitle?: Text): MenuCategory {
  return { id, title: text(title), items, ...(subtitle ? { subtitle: text(subtitle) } : {}) }
}

export const menuCategories: MenuCategory[] = [
  category('starters', ['Entradas', 'Starters', 'Entrées'], [
    item('e01', ['Cesto de Pão de Pizza', 'Pizza Bread Basket', 'Corbeille de pain à pizza'], 4),
    item('e02', ['Cesto de Pão', 'Bread Basket', 'Corbeille de pain'], 2),
    item('e03', 'Couvert', 4.5),
    item('e04', ['Pão de Alho com Mozzarella', 'Garlic Bread with Mozzarella', 'Pain à l’ail et mozzarella'], 4.5),
    item('e05', ['Azeitonas', 'Olives', 'Olives'], 1.5),
    item('e06', ['Bolinhos de Bacalhau', 'Salt Cod Fritters', 'Beignets de morue'], 4),
    item('e07', ['Rissóis de Camarão', 'Prawn Rissoles', 'Chaussons aux crevettes'], 4),
    item('e08', ['Rissóis de Carne', 'Meat Rissoles', 'Chaussons à la viande'], 4),
    item('e09', ['Alheira em Cama de Grelos', 'Alheira Sausage on Turnip Greens', 'Saucisse alheira sur lit de pousses de navet'], 8, undefined, { chefRecommended: true }),
    item('e10', ['Ovos Rotos com Cheddar', 'Broken Eggs with Cheddar', 'Œufs cassés au cheddar'], 9.5, undefined, { chefRecommended: true }),
    item('e11', ['Gambas al Ajillo', 'Garlic Prawns', 'Crevettes à l’ail'], 12.9, undefined, { chefRecommended: true }),
    item('e12', ['Picadinho à Tio Fredo', 'Tio Fredo Diced Meat', 'Émincé de viande Tio Fredo'], 11.5),
    item('e13', ['Amêijoas à Bulhão Pato', 'Bulhão Pato Clams', 'Palourdes à la Bulhão Pato'], 10, undefined, { chefRecommended: true }),
    item('e14', ['Prato de Presunto', 'Cured Ham Platter', 'Assiette de jambon cru'], 5),
    item('e15', ['Cogumelos Salteados com Bacon', 'Sautéed Mushrooms with Bacon', 'Champignons sautés au bacon'], 7.9, undefined, { chefRecommended: true }),
    item('e16', ['Melão com Presunto', 'Melon with Cured Ham', 'Melon au jambon cru'], 9),
    item('e17', ['Tábua de Queijo e Presunto', 'Cheese and Cured Ham Board', 'Planche de fromage et jambon cru'], 10),
    item('e18', ['Batatine Bolonhesa', 'Bolognese Fries', 'Frites à la bolognaise'], 7.5, ['Batatas fritas, queijo e molho à bolonhesa', 'Fries, cheese and Bolognese sauce', 'Frites, fromage et sauce bolognaise']),
    item('e19', ['Queijo Brie Gratinado', 'Baked Brie', 'Brie gratiné'], 8.5, undefined, { chefRecommended: true }),
    item('e20', ['Queijo Camembert Gratinado', 'Baked Camembert', 'Camembert gratiné'], 9.5, undefined, { chefRecommended: true }),
    item('e21', ['Sopa do Dia', 'Soup of the Day', 'Soupe du jour'], service(2, 2.5)),
  ]),
  category('salads', ['Saladas', 'Salads', 'Salades'], [
    item('s01', ['Salada Mista', 'Mixed Salad', 'Salade composée'], 2.6, ['Alface, tomate, couve roxa e azeitonas', 'Lettuce, tomato, red cabbage and olives', 'Laitue, tomate, chou rouge et olives'], { priceMax: 4.5 }),
    item('s02', ['Salada César', 'Caesar Salad', 'Salade César'], 10.9, ['Alface iceberg, molho César, frango, bacon torrado, pão torrado, queijo parmesão e tomate cherry', 'Iceberg lettuce, Caesar dressing, chicken, crispy bacon, toasted bread, Parmesan and cherry tomatoes', 'Laitue iceberg, sauce César, poulet, bacon grillé, pain grillé, parmesan et tomates cerises'], { chefRecommended: true }),
    item('s03', ['Salada Atalanta', 'Atalanta Salad', 'Salade Atalanta'], 13.9, ['Alface, salmão fumado, abacaxi, molho de iogurte e tomate cherry', 'Lettuce, smoked salmon, pineapple, yoghurt dressing and cherry tomatoes', 'Laitue, saumon fumé, ananas, sauce au yaourt et tomates cerises']),
    item('s04', ['Salada à Tio Fredo', 'Tio Fredo Salad', 'Salade Tio Fredo'], 9.9, ['Alface, tomate, cenoura, milho, batata cozida, grão-de-bico, atum, cebola, ovo e azeitonas', 'Lettuce, tomato, carrot, sweetcorn, boiled potato, chickpeas, tuna, onion, egg and olives', 'Laitue, tomate, carotte, maïs, pomme de terre vapeur, pois chiches, thon, oignon, œuf et olives']),
    item('s05', ['Salada de Massa Tricolor', 'Tricolour Pasta Salad', 'Salade de pâtes tricolores'], 9.9, ['Fusilli, cenoura, milho, atum, maionese, azeitonas e ovo', 'Fusilli, carrot, sweetcorn, tuna, mayonnaise, olives and egg', 'Fusilli, carotte, maïs, thon, mayonnaise, olives et œuf']),
  ]),
  category('meat', ['Carnes', 'Meat', 'Viandes'], [
    item('m01', ['Hambúrguer no Prato', 'Plated Beef Burger', 'Steak haché à l’assiette'], 10.5, ['Queijo, fiambre, ovo, molho à Tio Fredo, batatas fritas, arroz e salada', 'Cheese, ham, egg, Tio Fredo sauce, fries, rice and salad', 'Fromage, jambon, œuf, sauce Tio Fredo, frites, riz et salade']),
    item('m02', ['Peito Misto', 'Mixed Chicken Breast', 'Blanc de poulet garni'], 11.5, ['Peito de frango, queijo, fiambre, ovo, molho especial, batatas fritas, arroz e salada', 'Chicken breast, cheese, ham, egg, special sauce, fries, rice and salad', 'Blanc de poulet, fromage, jambon, œuf, sauce spéciale, frites, riz et salade'], { chefRecommended: true }),
    item('m03', 'Bitoque', 12.9, ['Bife grelhado, queijo, fiambre, ovo, molho à Tio Fredo, batatas fritas, arroz e salada', 'Grilled steak, cheese, ham, egg, Tio Fredo sauce, fries, rice and salad', 'Steak grillé, fromage, jambon, œuf, sauce Tio Fredo, frites, riz et salade'], { chefRecommended: true }),
    item('m04', ['Naco 3 Pimentas', 'Three-Pepper Steak', 'Pièce de bœuf aux trois poivres'], 17.5, ['Batata à rodela e legumes', 'Sliced potatoes and vegetables', 'Pommes de terre en rondelles et légumes']),
    item('m05', ['Alheira', 'Alheira Sausage', 'Saucisse alheira'], 10.5, ['Ovo, batata frita, arroz e salada', 'Egg, fries, rice and salad', 'Œuf, frites, riz et salade'], { chefRecommended: true }),
    item('m06', ['Bife de Entrecôte à Tio Fredo', 'Tio Fredo Entrecôte Steak', 'Entrecôte Tio Fredo'], 18.9, ['Queijo, fiambre, ovo, molho à Tio Fredo, batatas fritas à rodela, salada e arroz', 'Cheese, ham, egg, Tio Fredo sauce, sliced fries, salad and rice', 'Fromage, jambon, œuf, sauce Tio Fredo, pommes de terre frites en rondelles, salade et riz']),
    item('m07', ['Bifes de Frango com Cogumelos', 'Chicken Steaks with Mushrooms', 'Escalopes de poulet aux champignons'], 13, ['Molho de cogumelos, batatas fritas, arroz e salada', 'Mushroom sauce, fries, rice and salad', 'Sauce aux champignons, frites, riz et salade'], { chefRecommended: true }),
    item('m08', ['Bifes de Vitela com Cogumelos', 'Veal Steaks with Mushrooms', 'Escalopes de veau aux champignons'], 14.9, ['Molho de cogumelos, batatas fritas, arroz e salada', 'Mushroom sauce, fries, rice and salad', 'Sauce aux champignons, frites, riz et salade']),
    item('m09', ['Terra e Mar no Espeto', 'Surf and Turf Skewer', 'Brochette terre et mer'], 19.9, ['Bife de vitela, bacon, camarão, molho à Tio Fredo, batatas fritas à rodela e salada', 'Veal steak, bacon, prawns, Tio Fredo sauce, sliced fries and salad', 'Steak de veau, bacon, crevettes, sauce Tio Fredo, pommes de terre frites en rondelles et salade']),
    item('m10', ['Posta à Tio Fredo', 'Tio Fredo Thick-Cut Steak', 'Pièce de bœuf Tio Fredo'], 18.5, ['Batata à murro, legumes, molho de azeite e alho', 'Crushed potatoes, vegetables, olive oil and garlic sauce', 'Pommes de terre écrasées, légumes, sauce à l’huile d’olive et à l’ail']),
    item('m11', ['Bife de Entrecôte Grelhado', 'Grilled Entrecôte Steak', 'Entrecôte grillée'], 22, ['Guarnição à escolha', 'Your choice of side', 'Accompagnement au choix']),
    item('m12', ['T-Bone · 2 pessoas', 'T-Bone · serves 2', 'T-bone · 2 personnes'], 60),
    item('m13', ['Costeletão · 2 pessoas', 'Rib Steak · serves 2', 'Côte de bœuf · 2 personnes'], 50),
    item('m14', ['Bochechas de Porco Preto com Risotto de Cogumelos', 'Black Pork Cheeks with Mushroom Risotto', 'Joues de porc noir au risotto de champignons'], 15),
  ]),
  category('fish', ['Peixes', 'Fish', 'Poissons'], [
    item('f01', ['Bacalhau à Tio Fredo', 'Tio Fredo Salt Cod', 'Morue Tio Fredo'], portions(23, 45), ['Bacalhau frito, queijo, fiambre, cebolada, maionese, pickles, salada e batatas fritas à rodela', 'Fried salt cod, cheese, ham, onions, mayonnaise, pickles, salad and sliced fries', 'Morue frite, fromage, jambon, oignons, mayonnaise, pickles, salade et pommes de terre frites en rondelles']),
    item('f02', ['Bacalhau à Braga', 'Braga-Style Salt Cod', 'Morue à la mode de Braga'], portions(22, 42), ['Bacalhau frito, cebolada, batatas fritas à rodela, salada e pickles', 'Fried salt cod, onions, sliced fries, salad and pickles', 'Morue frite, oignons, pommes de terre frites en rondelles, salade et pickles']),
    item('f03', ['Bacalhau à Lagareiro', 'Lagareiro-Style Salt Cod', 'Morue à la lagareiro'], portions(22, 42), ['Bacalhau grelhado, pimento, cebola, batata à murro, legumes, molho de azeite e alho', 'Grilled salt cod, pepper, onion, crushed potatoes, vegetables, olive oil and garlic sauce', 'Morue grillée, poivron, oignon, pommes de terre écrasées, légumes, sauce à l’huile d’olive et à l’ail']),
    item('f04', ['Lulas Grelhadas', 'Grilled Squid', 'Calamars grillés'], 16.2, ['Batata à murro e legumes', 'Crushed potatoes and vegetables', 'Pommes de terre écrasées et légumes'], { chefRecommended: true }),
    item('f05', ['Polvo Grelhado', 'Grilled Octopus', 'Poulpe grillé'], 25.5, ['Batata à murro e legumes', 'Crushed potatoes and vegetables', 'Pommes de terre écrasées et légumes']),
    item('f06', ['Salmão Grelhado', 'Grilled Salmon', 'Saumon grillé'], 17.75, ['Batata à murro e legumes', 'Crushed potatoes and vegetables', 'Pommes de terre écrasées et légumes']),
    item('f07', ['Espetada de Lulas com Gambas', 'Squid and Prawn Skewer', 'Brochette de calamars et crevettes'], 18.9, ['Lulas, gambas, batata à murro e legumes', 'Squid, prawns, crushed potatoes and vegetables', 'Calamars, crevettes, pommes de terre écrasées et légumes']),
    item('f08', ['Filete de Pescada', 'Hake Fillet', 'Filet de merlu'], 14.9, ['Batata frita, arroz e salada', 'Fries, rice and salad', 'Frites, riz et salade'], { chefRecommended: true }),
  ]),
  category('pizzas', ['Pizzas', 'Pizzas', 'Pizzas'], [
    item('p01', ['Pizza Margarita', 'Margherita Pizza', 'Pizza Margarita'], sizes(8.5, 11), ['Molho de tomate, mozzarella e orégãos', 'Tomato sauce, mozzarella and oregano', 'Sauce tomate, mozzarella et origan']),
    item('p02', ['Pizza Bolonhesa', 'Bolognese Pizza', 'Pizza bolognaise'], sizes(9.7, 12.2), ['Molho de tomate, mozzarella e bolonhesa', 'Tomato sauce, mozzarella and Bolognese', 'Sauce tomate, mozzarella et bolognaise']),
    item('p03', 'Pizza Bryan', sizes(9.4, 11.9), ['Molho de tomate, mozzarella, fiambre, cogumelos e pimentos', 'Tomato sauce, mozzarella, ham, mushrooms and peppers', 'Sauce tomate, mozzarella, jambon, champignons et poivrons']),
    item('p04', ['Pizza Vegetariana', 'Vegetarian Pizza', 'Pizza végétarienne'], sizes(9.6, 12.1), ['Molho de tomate, mozzarella, cogumelos, tomates frescos, cebola, pimentos e azeitonas', 'Tomato sauce, mozzarella, mushrooms, fresh tomatoes, onion, peppers and olives', 'Sauce tomate, mozzarella, champignons, tomates fraîches, oignon, poivrons et olives']),
    item('p05', 'Pizza Ilda', sizes(9.8, 12.3), ['Molho de tomate, mozzarella, fiambre, bacon e chouriço', 'Tomato sauce, mozzarella, ham, bacon and chouriço', 'Sauce tomate, mozzarella, jambon, bacon et chouriço']),
    item('p06', ['Pizza Camponesa', 'Country-Style Pizza', 'Pizza paysanne'], sizes(10.5, 13), ['Molho de tomate, mozzarella, frango, cogumelos, cebola e pimentos', 'Tomato sauce, mozzarella, chicken, mushrooms, onion and peppers', 'Sauce tomate, mozzarella, poulet, champignons, oignon et poivrons']),
    item('p07', 'Pizza Neptuno', sizes(10.5, 13), ['Molho de tomate, mozzarella, atum e cebola', 'Tomato sauce, mozzarella, tuna and onion', 'Sauce tomate, mozzarella, thon et oignon']),
    item('p08', ['Pizza Caprichosa', 'Caprichosa Pizza', 'Pizza Caprichosa'], sizes(10.7, 13.2), ['Molho de tomate, mozzarella, pepperoni, cogumelos e pimentos', 'Tomato sauce, mozzarella, pepperoni, mushrooms and peppers', 'Sauce tomate, mozzarella, pepperoni, champignons et poivrons']),
    item('p09', ['Pizza Hawai', 'Hawaiian Pizza', 'Pizza hawaïenne'], sizes(10.7, 13.2), ['Molho de tomate, mozzarella, pepperoni, ananás e cebola', 'Tomato sauce, mozzarella, pepperoni, pineapple and onion', 'Sauce tomate, mozzarella, pepperoni, ananas et oignon']),
    item('p10', 'Pizza Tio Fredo', sizes(11.4, 13.9), ['Molho de tomate, mozzarella, bacon, fiambre, chouriço, cogumelos, linguiça, salsicha, pimentos e azeitonas', 'Tomato sauce, mozzarella, bacon, ham, chouriço, mushrooms, linguiça, sausage, peppers and olives', 'Sauce tomate, mozzarella, bacon, jambon, chouriço, champignons, linguiça, saucisse, poivrons et olives'], { chefRecommended: true }),
    item('p11', ['Pizza Tropical', 'Tropical Pizza', 'Pizza tropicale'], sizes(10, 12.5), ['Molho de tomate, mozzarella, frango e ananás', 'Tomato sauce, mozzarella, chicken and pineapple', 'Sauce tomate, mozzarella, poulet et ananas']),
    item('p12', ['Pizza Americana', 'American Pizza', 'Pizza américaine'], sizes(11.2, 13.7), ['Molho de tomate, mozzarella, bacon, cebola, chouriço, cogumelos, carne picada, pimentos e azeitonas', 'Tomato sauce, mozzarella, bacon, onion, chouriço, mushrooms, minced meat, peppers and olives', 'Sauce tomate, mozzarella, bacon, oignon, chouriço, champignons, viande hachée, poivrons et olives']),
    item('p13', ['Pizza Júnior', 'Junior Pizza', 'Pizza junior'], sizes(8.9, 11.4), ['Molho de tomate, mozzarella e fiambre', 'Tomato sauce, mozzarella and ham', 'Sauce tomate, mozzarella et jambon']),
    item('p14', 'Pizza Carbonara', sizes(11.5, 14), ['Molho carbonara, mozzarella, ovo e guanciale', 'Carbonara sauce, mozzarella, egg and guanciale', 'Sauce carbonara, mozzarella, œuf et guanciale']),
    item('p15', ['Pizza Terra e Mar', 'Surf and Turf Pizza', 'Pizza terre et mer'], sizes(11.5, 14), ['Molho de tomate, mozzarella, cebola, bacon e marisco', 'Tomato sauce, mozzarella, onion, bacon and seafood', 'Sauce tomate, mozzarella, oignon, bacon et fruits de mer']),
    item('p16', ['Pizza 3 Queijos', 'Three-Cheese Pizza', 'Pizza trois fromages'], sizes(11.5, 14), ['Molho de tomate, mozzarella, gorgonzola e parmesão', 'Tomato sauce, mozzarella, gorgonzola and Parmesan', 'Sauce tomate, mozzarella, gorgonzola et parmesan']),
    item('p17', 'Pizza Barbecue', sizes(11.2, 13.7), ['Molho barbecue, mozzarella, cebola, frango e bacon', 'Barbecue sauce, mozzarella, onion, chicken and bacon', 'Sauce barbecue, mozzarella, oignon, poulet et bacon']),
    item('p18', ['Pizza Tomate Presunto', 'Tomato and Cured Ham Pizza', 'Pizza tomate et jambon cru'], sizes(11.4, 14.4), ['Molho de tomate, mozzarella, tomate cherry, presunto, parmesão e rúcula', 'Tomato sauce, mozzarella, cherry tomatoes, cured ham, Parmesan and rocket', 'Sauce tomate, mozzarella, tomates cerises, jambon cru, parmesan et roquette']),
    item('p19', ['Pizza 4 Estações', 'Four Seasons Pizza', 'Pizza quatre saisons'], sizes(11.7, 14.2), ['¼ Margarita, ¼ Terra e Mar sem cebola, ¼ salsicha e presunto e ¼ vegetariana', '¼ Margherita, ¼ surf and turf without onion, ¼ sausage and cured ham, ¼ vegetarian', '¼ Margarita, ¼ terre et mer sans oignon, ¼ saucisse et jambon cru, ¼ végétarienne']),
    item('p20', 'Pizza Puttanesca', sizes(12.7, 15.2), ['Molho de tomate, mozzarella, cebola, bacon, fiambre, chouriço, cogumelos, anchovas, alcaparras e alho', 'Tomato sauce, mozzarella, onion, bacon, ham, chouriço, mushrooms, anchovies, capers and garlic', 'Sauce tomate, mozzarella, oignon, bacon, jambon, chouriço, champignons, anchois, câpres et ail']),
    item('p21', 'Pizza Kebab', sizes(10.1, 12.6), ['Molho de tomate, mozzarella e carne de kebab', 'Tomato sauce, mozzarella and kebab meat', 'Sauce tomate, mozzarella et viande de kebab']),
    item('p22', 'Pizza Diavala', sizes(10.2, 12.7), ['Molho de tomate, mozzarella, pepperoni e piri-piri', 'Tomato sauce, mozzarella, pepperoni and piri-piri', 'Sauce tomate, mozzarella, pepperoni et piri-piri']),
    item('p23', ['Pizza Salmão Boss', 'Salmon Boss Pizza', 'Pizza saumon Boss'], sizes(13, 15.5), ['Molho de tomate, mozzarella, tomate cherry, parmesão, rúcula e salmão fumado', 'Tomato sauce, mozzarella, cherry tomatoes, Parmesan, rocket and smoked salmon', 'Sauce tomate, mozzarella, tomates cerises, parmesan, roquette et saumon fumé']),
    item('p24', 'Pizza Regina', sizes(11.2, 13.7), ['Molho de tomate, mozzarella, bacon, cogumelos e atum', 'Tomato sauce, mozzarella, bacon, mushrooms and tuna', 'Sauce tomate, mozzarella, bacon, champignons et thon']),
  ], ['Dois tamanhos: pequena (P) e grande (G)', 'Two sizes: small (P) and large (G)', 'Deux tailles : petite (P) et grande (G)']),
  category('calzones', ['Pizzas Recheadas', 'Calzones', 'Pizzas farcies'], [
    item('c01', 'Calzone', 10.3, ['Molho de tomate, mozzarella, fiambre e cogumelos', 'Tomato sauce, mozzarella, ham and mushrooms', 'Sauce tomate, mozzarella, jambon et champignons']),
    item('c02', ['Calzone Terra e Mar', 'Surf and Turf Calzone', 'Calzone terre et mer'], 12.3, ['Molho de tomate, mozzarella, marisco e bacon', 'Tomato sauce, mozzarella, seafood and bacon', 'Sauce tomate, mozzarella, fruits de mer et bacon']),
    item('c03', ['Calzone Vegetariana', 'Vegetarian Calzone', 'Calzone végétarienne'], 11.3, ['Molho de tomate, mozzarella, cebola, pimento, milho, cogumelos e ovo', 'Tomato sauce, mozzarella, onion, pepper, sweetcorn, mushrooms and egg', 'Sauce tomate, mozzarella, oignon, poivron, maïs, champignons et œuf']),
  ]),
  category('pasta', ['Pastas', 'Pasta', 'Pâtes'], [
    item('pa01', ['Lasanha', 'Lasagne', 'Lasagnes'], 11),
    item('pa02', ['Lasanha Vegetariana', 'Vegetarian Lasagne', 'Lasagnes végétariennes'], 11),
    item('pa03', ['Esparguete à Bolonhesa', 'Spaghetti Bolognese', 'Spaghetti à la bolognaise'], 11),
    item('pa04', ['Esparguete à Bolonhesa Gratinada', 'Baked Spaghetti Bolognese', 'Spaghetti à la bolognaise gratinés'], 12),
    item('pa05', ['Esparguete Carbonara', 'Spaghetti Carbonara', 'Spaghetti carbonara'], 13.9, ['Gema de ovo, guanciale e parmesão', 'Egg yolk, guanciale and Parmesan', 'Jaune d’œuf, guanciale et parmesan'], { chefRecommended: true }),
    item('pa06', ['Esparguete Vegetariana', 'Vegetarian Spaghetti', 'Spaghetti végétariens'], 12, ['Cogumelos, azeitona preta, cebola, curgete, pimento, alho e molho de tomate', 'Mushrooms, black olives, onion, courgette, pepper, garlic and tomato sauce', 'Champignons, olives noires, oignon, courgette, poivron, ail et sauce tomate'], { chefRecommended: true }),
    item('pa07', ['Esparguete Negra à Tio Alfredo com Gambas', 'Tio Alfredo Black Spaghetti with Prawns', 'Spaghetti noirs Tio Alfredo aux crevettes'], 13.9, ['Creme de marisco, queijo parmesão e gambas', 'Seafood cream, Parmesan and prawns', 'Crème de fruits de mer, parmesan et crevettes']),
    item('pa08', ['Esparguete Salteado com Gambas', 'Sautéed Spaghetti with Prawns', 'Spaghetti sautés aux crevettes'], 13),
  ]),
  category('francesinhas', ['Francesinhas', 'Francesinhas', 'Francesinhas'], [
    item('fr01', ['Francesinha de Cachorro', 'Hot Dog Francesinha', 'Francesinha au hot-dog'], 11, ['Salsicha, queijo, fiambre, molho de francesinha e batatas fritas', 'Sausage, cheese, ham, francesinha sauce and fries', 'Saucisse, fromage, jambon, sauce francesinha et frites']),
    item('fr02', ['Francesinha Americana', 'American Francesinha', 'Francesinha américaine'], 11.9, ['Hambúrguer, bacon, queijo, fiambre, molho de francesinha e batatas fritas', 'Beef burger, bacon, cheese, ham, francesinha sauce and fries', 'Steak haché, bacon, fromage, jambon, sauce francesinha et frites']),
    item('fr03', ['Francesinha Especial', 'Special Francesinha', 'Francesinha spéciale'], 13.5, ['Crioulo, queijo, fiambre, bife, peito de frango, ovo, molho de francesinha e batatas fritas', 'Crioulo sausage, cheese, ham, steak, chicken breast, egg, francesinha sauce and fries', 'Saucisse crioulo, fromage, jambon, steak, blanc de poulet, œuf, sauce francesinha et frites'], { chefRecommended: true }),
    item('fr04', ['Francesinha à Chefe', 'Chef’s Francesinha', 'Francesinha du chef'], 13.9, ['Queijo, fiambre, bacon, salpicão fumado, ovo, bife de alcatra, molho de francesinha e batatas fritas', 'Cheese, ham, bacon, smoked salpicão, egg, rump steak, francesinha sauce and fries', 'Fromage, jambon, bacon, salpicão fumé, œuf, rumsteck, sauce francesinha et frites'], { chefRecommended: true }),
    item('fr05', ['Francesinha de Chicken Boss', 'Chicken Boss Francesinha', 'Francesinha Chicken Boss'], 13, ['Frango, queijo, fiambre e ovo', 'Chicken, cheese, ham and egg', 'Poulet, fromage, jambon et œuf']),
    item('fr06', 'Senhorita', 9.5, ['½ francesinha à chefe', 'Half a chef’s francesinha', 'Demi-francesinha du chef']),
    item('fr07', ['Francesinha de Kebab', 'Kebab Francesinha', 'Francesinha au kebab'], 13.5, ['Queijo, fiambre, kebab, molho e batata', 'Cheese, ham, kebab meat, sauce and potatoes', 'Fromage, jambon, viande de kebab, sauce et pommes de terre']),
  ]),
  category('burgers', ['Hambúrgueres', 'Burgers', 'Burgers'], [
    item('b01', ['Hambúrguer à Tio Fredo', 'Tio Fredo Burger', 'Burger Tio Fredo'], 5.9, ['Alface iceberg, tomate, queijo, fiambre, ovo e molho especial', 'Iceberg lettuce, tomato, cheese, ham, egg and special sauce', 'Laitue iceberg, tomate, fromage, jambon, œuf et sauce spéciale'], { chefRecommended: true }),
    item('b02', ['Hambúrguer de Frango', 'Chicken Burger', 'Burger au poulet'], 5.5, ['Alface iceberg, tomate, peito de frango, queijo, fiambre, ovo e molho especial', 'Iceberg lettuce, tomato, chicken breast, cheese, ham, egg and special sauce', 'Laitue iceberg, tomate, blanc de poulet, fromage, jambon, œuf et sauce spéciale'], { chefRecommended: true }),
    item('b03', ['Hambúrguer Dupla', 'Double Burger', 'Double burger'], 7, ['Alface, tomate, dois hambúrgueres, queijo, fiambre e molho especial', 'Lettuce, tomato, two beef patties, cheese, ham and special sauce', 'Laitue, tomate, deux steaks hachés, fromage, jambon et sauce spéciale']),
    item('b04', ['Hambúrguer Smash Burguer', 'Smash Burger', 'Smash burger'], 9.5, ['Pão brioche, bacon crocante, cheddar, pickles de cebola e molho', 'Brioche bun, crispy bacon, cheddar, pickled onion and sauce', 'Pain brioché, bacon croustillant, cheddar, pickles d’oignon et sauce']),
  ], ['Hambúrgueres sem acompanhamento de batata frita', 'Burgers do not include fries', 'Burgers servis sans frites']),
  category('omelettes', ['Omeletes', 'Omelettes', 'Omelettes'], [
    item('o01', ['Omelete Vegetariana', 'Vegetarian Omelette', 'Omelette végétarienne'], 10.9, ['Cogumelos, cebola, pimentos, batatas fritas e salada', 'Mushrooms, onion, peppers, fries and salad', 'Champignons, oignon, poivrons, frites et salade']),
    item('o02', ['Omelete Neptuno', 'Neptuno Omelette', 'Omelette Neptuno'], 10.9, ['Atum, cebola, batatas fritas e salada', 'Tuna, onion, fries and salad', 'Thon, oignon, frites et salade']),
    item('o03', ['Omelete Fontaínhas', 'Fontaínhas Omelette', 'Omelette Fontaínhas'], 10.9, ['Queijo, fiambre, cebola, salsa, batatas fritas e salada', 'Cheese, ham, onion, parsley, fries and salad', 'Fromage, jambon, oignon, persil, frites et salade'], { chefRecommended: true }),
  ]),
  category('sandwiches', ['Sandes', 'Sandwiches', 'Sandwichs'], [
    item('sa01', ['Prego no Pão', 'Steak Sandwich', 'Sandwich au steak'], 4),
    item('sa02', ['Prego Tio Fredo em Bolo do Caco', 'Tio Fredo Steak in Bolo do Caco Bread', 'Sandwich au steak Tio Fredo en pain bolo do caco'], 9, ['Entrecôte, queijo, fiambre, ovo e molho de alho', 'Entrecôte, cheese, ham, egg and garlic sauce', 'Entrecôte, fromage, jambon, œuf et sauce à l’ail']),
    item('sa03', ['Fêvera no Pão', 'Pork Steak Sandwich', 'Sandwich au porc'], 4),
    item('sa04', ['Baguete de Frango', 'Chicken Baguette', 'Baguette au poulet'], 5.8, ['Alface, tomate, frango, bacon e maionese', 'Lettuce, tomato, chicken, bacon and mayonnaise', 'Laitue, tomate, poulet, bacon et mayonnaise']),
    item('sa05', ['Baguete Vegetariana', 'Vegetarian Baguette', 'Baguette végétarienne'], 5, ['Alface, tomate, ovo, mozzarella e molho especial', 'Lettuce, tomato, egg, mozzarella and special sauce', 'Laitue, tomate, œuf, mozzarella et sauce spéciale']),
  ]),
  category('sides', ['Acompanhamentos', 'Side Dishes', 'Accompagnements'], [
    item('a01', ['Batata Frita', 'Fries', 'Frites'], service(2, 2.5)),
    item('a02', ['Batata à Murro', 'Crushed Potatoes', 'Pommes de terre écrasées'], service(3.5, 4)),
    item('a03', ['Arroz', 'Rice', 'Riz'], service(2, 2.5)),
    item('a04', ['Legumes', 'Vegetables', 'Légumes'], service(3.5, 4)),
  ]),
  category('extras', ['Ingredientes Extra', 'Extras', 'Suppléments'], [
    ...group(['Para pizzas', 'For pizzas', 'Pour les pizzas'], [
      item('x01', ['Fiambre, chouriço, linguiça, salsicha ou bacon', 'Ham, chouriço, linguiça, sausage or bacon', 'Jambon, chouriço, linguiça, saucisse ou bacon'], sizes(1.5, 1.8)),
      item('x02', ['Frango, presunto, pepperoni ou carne picada', 'Chicken, cured ham, pepperoni or minced meat', 'Poulet, jambon cru, pepperoni ou viande hachée'], sizes(1.6, 2.1)),
      item('x03', ['Cogumelos, pimentos, azeitonas, cebola, milho, molho de tomate ou tomates frescos', 'Mushrooms, peppers, olives, onion, sweetcorn, tomato sauce or fresh tomatoes', 'Champignons, poivrons, olives, oignon, maïs, sauce tomate ou tomates fraîches'], sizes(.9, 1.3)),
      item('x04', ['Marisco', 'Seafood', 'Fruits de mer'], sizes(2.6, 3.6)),
      item('x05', ['Anchovas, atum ou mozzarella', 'Anchovies, tuna or mozzarella', 'Anchois, thon ou mozzarella'], 2.6),
      item('x06', ['Ovo', 'Egg', 'Œuf'], .8),
      item('x07', ['Ananás', 'Pineapple', 'Ananas'], .9),
    ]),
    ...group(['Para hambúrgueres · por fatia', 'For burgers · per slice', 'Pour les burgers · par tranche'], [
      item('x08', ['Alface, tomate, cebola…', 'Lettuce, tomato, onion…', 'Laitue, tomate, oignon…'], .5),
      item('x09', ['Fiambre, queijo, bacon…', 'Ham, cheese, bacon…', 'Jambon, fromage, bacon…'], .6),
    ]),
    ...group(['Outros extras', 'Other extras', 'Autres suppléments'], [
      item('x10', ['Molho de Francesinha', 'Francesinha Sauce', 'Sauce francesinha'], 3),
      item('x11', ['Dose Extra de Gambas · 6 unidades', 'Extra Prawns · 6 pieces', 'Supplément crevettes · 6 pièces'], 5),
    ]),
  ]),
  category('drinks', ['Bebidas & Cocktails', 'Drinks & Cocktails', 'Boissons & Cocktails'], [
    ...group(['Cocktails & aperitivos', 'Cocktails & aperitifs', 'Cocktails & apéritifs'], [
      item('d01', ['Spritz Maracujá', 'Passion Fruit Spritz', 'Spritz au fruit de la passion'], 5.5),
      item('d02', ['Piña Colada · normal e morango', 'Piña Colada · classic or strawberry', 'Piña colada · classique ou fraise'], 6.5),
      item('d03', ['Caipirinha · normal e preta', 'Caipirinha · classic or black', 'Caïpirinha · classique ou noire'], 5.5),
      item('d04', ['Mojito · normal e maracujá', 'Mojito · classic or passion fruit', 'Mojito · classique ou fruit de la passion'], 6.5),
      item('d05', ['Caipiroska de Maracujá', 'Passion Fruit Caipiroska', 'Caïpiroska au fruit de la passion'], 6.5),
      item('d06', ['Sugestão do Dia', 'Suggestion of the Day', 'Suggestion du jour'], 7),
    ]),
    ...group(['Menu refrescante', 'Refreshing drinks', 'Boissons rafraîchissantes'], [
      item('d07', ['Limonada', 'Lemonade', 'Citronnade'], 3),
      item('d08', ['Limonada de Morango', 'Strawberry Lemonade', 'Citronnade à la fraise'], 3.4),
      item('d09', ['Limonada de Maracujá', 'Passion Fruit Lemonade', 'Citronnade au fruit de la passion'], 3.4),
      item('d10', ['Frozen Daiquiri · morango ou maracujá', 'Frozen Daiquiri · strawberry or passion fruit', 'Daiquiri glacé · fraise ou fruit de la passion'], 6.5),
      item('d11', ['Milkshake · morango, baunilha ou chocolate', 'Milkshake · strawberry, vanilla or chocolate', 'Milkshake · fraise, vanille ou chocolat'], 4.5),
      item('d12', 'Espresso Martini', 6),
      item('d13', 'Long Island Ice Tea', 8),
    ]),
    ...group(['Sangrias', 'Sangrias', 'Sangrias'], [
      item('d14', ['Sangria Maracujá', 'Passion Fruit Sangria', 'Sangria au fruit de la passion'], sangria(12, 23)),
      item('d15', ['Sangria Maracujá e Maçã', 'Passion Fruit and Apple Sangria', 'Sangria au fruit de la passion et à la pomme'], sangria(12, 23)),
      item('d16', ['Sangria Frutos Vermelhos', 'Red Berry Sangria', 'Sangria aux fruits rouges'], sangria(12, 23)),
      item('d17', ['Sangria Branca', 'White Sangria', 'Sangria blanche'], sangria(10, 19, 3.5)),
      item('d18', ['Sangria Tinta', 'Red Sangria', 'Sangria rouge'], sangria(12, 23)),
    ]),
    ...group(['Aperitivos', 'Aperitifs', 'Apéritifs'], [
      item('d19', ['Porto · branco ou tinto', 'Port · white or red', 'Porto · blanc ou rouge'], 1.7),
      item('d20', ['Martini · branco ou tinto', 'Martini · white or red', 'Martini · blanc ou rouge'], 1.7),
      item('d21', 'Kir', 1.9),
      item('d22', ['Martini com Cerveja ou 7up', 'Martini with Beer or 7up', 'Martini à la bière ou au 7up'], 2.2),
      item('d23', 'Favaios', 1.7), item('d24', 'Ricard', 2),
      item('d25', 'Gin Tonic', 5.5), item('d26', 'Whiskey Cola', 5.5), item('d27', 'Cuba Livre', 5.5),
    ]),
    ...group(['Rum', 'Rum', 'Rhum'], [
      item('d28', 'Malibu', 4.5), item('d29', 'Bacardi', 4.5), item('d30', 'Bacardi 8 Yrs', 6), item('d31', 'Pyrat XO Reserva', 10),
    ]),
    ...group(['Whiskey', 'Whisky', 'Whisky'], [
      item('d32', 'JB', 4.5), item('d33', 'JB 15 Yrs', 5.8), item('d34', 'Red Label', 5.3), item('d35', 'Black Label', 6.3),
      item('d36', 'Jameson Irish Whiskey', 5.3), item('d37', 'Jack Daniel’s', 5.8), item('d38', 'Chivas 12 Yrs', 6.3),
      item('d39', 'Bushmills', 4.8), item('d40', 'Old Parr 12 Yrs', 7.3), item('d41', 'J.W. Double Black', 6.8), item('d42', 'Cardhu', 7.3),
    ]),
    ...group(['Vodka', 'Vodka', 'Vodka'], [
      item('d43', 'Eristoff', 4.5), item('d44', 'Grey Goose', 9),
      item('d45', ['Grey Goose · garrafa', 'Grey Goose · bottle', 'Grey Goose · bouteille'], 100), item('d46', 'Absolut Vodka', 4.5),
    ]),
    ...group(['Licores', 'Liqueurs', 'Liqueurs'], [
      item('d47', ['Amêndoa Amarga', 'Bitter Almond Liqueur', 'Liqueur d’amande amère'], 3.5),
      item('d48', 'Licor Beirão', 4.5), item('d49', 'Baileys', 4.5), item('d50', 'Kahlua', 4.5), item('d51', 'Safari', 4.5),
      item('d52', 'Amaretto', 4.5), item('d53', 'Pilinhas', 1.5), item('d54', 'GET27', 4.5),
      item('d55', ['Shot · bebida de serviço', 'Shot · house selection', 'Shot · sélection de la maison'], 2.5),
    ]),
    ...group(['Digestivos', 'Digestifs', 'Digestifs'], [
      item('d56', 'Macieira', 3), item('d57', 'Bagaceira', 1.5), item('d58', '1920', 3), item('d59', 'Croft', 3),
      item('d60', 'Aldeia Velha', 3.4), item('d61', 'Ponte de Amarante', 3.4), item('d62', 'CRF', 5), item('d63', 'Martel V.S.O.P.', 7.5), item('d64', 'Henessy', 10.5),
    ]),
  ]),
  category('wines', ['Carta de Vinhos', 'Wine List', 'Carte des vins'], [
    ...group(['Verdes brancos', 'White Vinho Verde', 'Vinho Verde blanc'], [
      item('w01', 'Alvarinho Loureiro', 9, ['Ponte da Barca · 75 cl', 'Ponte da Barca · 75 cl', 'Ponte da Barca · 75 cl']),
      item('w02', 'Pequenos Rebentos', 13, ['Alvarinho Monção e Melgaço · 75 cl', 'Alvarinho Monção e Melgaço · 75 cl', 'Alvarinho Monção e Melgaço · 75 cl']),
      item('w03', 'Loureiro', 9.4, ['Ponte de Lima · 75 cl', 'Ponte de Lima · 75 cl', 'Ponte de Lima · 75 cl']),
      item('w04', 'Muralhas', 10.5, ['Monção · 75 cl', 'Monção · 75 cl', 'Monção · 75 cl']),
      item('w05', 'Muros Antigos', 13, ['Alvarinho Monção e Melgaço · 75 cl', 'Alvarinho Monção e Melgaço · 75 cl', 'Alvarinho Monção e Melgaço · 75 cl']),
      item('w06', 'Ponte da Barca', 8, ['75 cl', '75 cl', '75 cl']),
      item('w07', ['Branco da Casa', 'House White', 'Blanc de la maison'], houseWine(), ['Ponte da Barca', 'Ponte da Barca', 'Ponte da Barca']),
    ]),
    ...group(['Verdes tintos', 'Red Vinho Verde', 'Vinho Verde rouge'], [
      item('w08', 'Ponte da Barca', 8.5, ['75 cl', '75 cl', '75 cl']),
      item('w09', 'Vinhão', 9.5, ['Ponte da Barca · 75 cl', 'Ponte da Barca · 75 cl', 'Ponte da Barca · 75 cl']),
      item('w10', ['Tinto da Casa', 'House Red', 'Rouge de la maison'], houseWine(), ['Ponte da Barca', 'Ponte da Barca', 'Ponte da Barca']),
    ]),
    ...group(['Maduros brancos', 'White Wine', 'Vins blancs'], [
      item('w11', 'Caiado', 10, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w12', 'Periquita', 10, ['Lisboa · 75 cl', 'Lisboa · 75 cl', 'Lisboa · 75 cl']),
      item('w13', 'Libra Litas', 20, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w14', 'Duas Quintas', 23, ['Douro · 75 cl', 'Douro · 75 cl', 'Douro · 75 cl']),
    ]),
    ...group(['Rosés', 'Rosé Wine', 'Vins rosés'], [
      item('w15', 'Mateus Rosé', 9, ['Douro · 75 cl', 'Douro · 75 cl', 'Douro · 75 cl']),
      item('w16', 'Ponte da Barca', 9, ['75 cl', '75 cl', '75 cl']),
    ]),
    ...group(['Espumantes', 'Sparkling Wine', 'Vins effervescents'], [
      item('w17', 'Ponte da Barca', 13, ['75 cl', '75 cl', '75 cl']), item('w18', 'Terras do Demo', 19, ['75 cl', '75 cl', '75 cl']),
    ]),
    ...group(['Maduros tintos', 'Red Wine', 'Vins rouges'], [
      item('w19', 'Adega Maior', 18, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w20', 'Alandra', 6.5, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w21', 'Monsaraz', 9, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w22', 'Monte Velho', 10, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w23', 'Monte das Servas', 13, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w24', 'Borba', 10, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w25', 'Sossego', 10, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w26', 'EA (Cartuxa)', 10.5, ['Alentejo · 75 cl', 'Alentejo · 75 cl', 'Alentejo · 75 cl']),
      item('w27', 'Grão Vasco', 9.5, ['Dão · 75 cl', 'Dão · 75 cl', 'Dão · 75 cl']),
      item('w28', 'Estêva', 10.5, ['Douro · 75 cl', 'Douro · 75 cl', 'Douro · 75 cl']),
      item('w29', 'Vallado (D.O.C.)', 16.5, ['Douro · 75 cl', 'Douro · 75 cl', 'Douro · 75 cl']),
      item('w30', 'Papa Figos', 16.5, ['Douro · 75 cl', 'Douro · 75 cl', 'Douro · 75 cl']),
      item('w31', 'Periquita', 10.5, ['Lisboa · 75 cl', 'Lisboa · 75 cl', 'Lisboa · 75 cl']),
      item('w32', ['Vinho da Casa', 'House Wine', 'Vin de la maison'], houseWine(), ['Cabeça do Pote', 'Cabeça do Pote', 'Cabeça do Pote']),
      item('w33', 'Alandra', 4, ['Alentejo · garrafa pequena', 'Alentejo · small bottle', 'Alentejo · petite bouteille']),
      item('w34', 'Monsaraz', 5.2, ['Alentejo · garrafa pequena', 'Alentejo · small bottle', 'Alentejo · petite bouteille']),
      item('w35', 'Estêva', 6.7, ['Douro · garrafa pequena', 'Douro · small bottle', 'Douro · petite bouteille']),
      item('w36', 'Rola', 17.5, ['Douro', 'Douro', 'Douro']),
      item('w37', 'Quinta S. Luis — Reserva', 18.5, ['Douro', 'Douro', 'Douro']),
      item('w38', 'Quilate', 12.5, ['Douro', 'Douro', 'Douro']),
      item('w39', 'Anel', 12, ['Douro', 'Douro', 'Douro']),
      item('w40', 'Cartucha', 35, ['Alentejo', 'Alentejo', 'Alentejo']),
      item('w41', 'Monte dos Perdigões', 16.5, ['Alentejo', 'Alentejo', 'Alentejo']),
    ]),
  ]),
]

export const menuHero = {
  eyebrow: 'A nossa ementa', title: 'Ementa',
  subtitle: 'Pizzas, massas, carnes, peixe e pratos da cozinha portuguesa — uma seleção dos sabores do Tio Fredo.',
}
