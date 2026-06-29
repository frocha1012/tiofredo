import type { MenuCategory } from '@/types'

/** Ementa de demonstração — pratos e preços ilustrativos para apresentação ao cliente */
export const menuCategories: MenuCategory[] = [
  {
    id: 'pizzas',
    title: 'Pizzas',
    subtitle: 'Massa fina artesanal · forno tradicional',
    items: [
      {
        id: 'p1',
        name: 'Margherita',
        description: 'Tomate, mozzarella e manjericão fresco',
        price: 8.5,
      },
      {
        id: 'p2',
        name: 'Tio Fredo',
        description: 'Especialidade da casa com fiambre, cogumelos e azeitonas',
        price: 10.5,
      },
      {
        id: 'p3',
        name: 'Quatro Queijos',
        description: 'Mozzarella, gorgonzola, parmesão e queijo flamengo',
        price: 11,
      },
      {
        id: 'p4',
        name: 'Diavola',
        description: 'Salame picante, tomate e mozzarella',
        price: 10,
      },
      {
        id: 'p5',
        name: 'Vegetariana',
        description: 'Pimentos, courgette, cebola, azeitonas e rúcula',
        price: 9.5,
      },
      {
        id: 'p6',
        name: 'Atum',
        description: 'Atum, cebola, tomate e oregãos',
        price: 10.5,
      },
    ],
  },
  {
    id: 'pasta',
    title: 'Massas',
    subtitle: 'Receitas clássicas italianas',
    items: [
      {
        id: 'pa1',
        name: 'Spaghetti Bolognese',
        description: 'Carne de vaca estufada com tomate e parmesão',
        price: 9.5,
      },
      {
        id: 'pa2',
        name: 'Penne Arrabiata',
        description: 'Tomate, alho, malagueta e manjericão',
        price: 8.5,
      },
      {
        id: 'pa3',
        name: 'Lasagna da Casa',
        description: 'Camadas de massa, bolonhesa e bechamel gratinada',
        price: 11,
      },
      {
        id: 'pa4',
        name: 'Tagliatelle Carbonara',
        description: 'Bacon, gemas, parmesão e pimenta preta',
        price: 10,
      },
    ],
  },
  {
    id: 'meat',
    title: 'Carnes',
    subtitle: 'Grelhados e pratos de carne',
    items: [
      {
        id: 'm1',
        name: 'Bife no Espeto',
        description: 'Especialidade da casa com batata cozida e legumes',
        price: 14.5,
      },
      {
        id: 'm2',
        name: 'Posta Mirandesa',
        description: 'Carne DOP grelhada com batata frita e salada',
        price: 18,
      },
      {
        id: 'm3',
        name: 'Francesinha',
        description: 'Sanduíche com molho especial, queijo gratinado e batata frita',
        price: 12.5,
      },
      {
        id: 'm4',
        name: 'Bife à Casa',
        description: 'Bife de vaca com molho de cogumelos e arroz ou batata',
        price: 13.5,
      },
    ],
  },
  {
    id: 'fish',
    title: 'Peixe',
    subtitle: 'Peixe fresco e marisco',
    items: [
      {
        id: 'f1',
        name: 'Bacalhau à Brás',
        description: 'Bacalhau desfiado com batata palha, ovos e azeitonas',
        price: 13,
      },
      {
        id: 'f2',
        name: 'Bacalhau com Natas',
        description: 'Gratinado no forno com batata e cebola',
        price: 14,
      },
      {
        id: 'f3',
        name: 'Filetes de Pescada',
        description: 'Panados com arroz de tomate e salada',
        price: 12,
      },
      {
        id: 'f4',
        name: 'Polvo à Lagareiro',
        description: 'Polvo grelhado com batata a murro e azeite',
        price: 16.5,
      },
    ],
  },
  {
    id: 'portuguese',
    title: 'Especialidades Portuguesas',
    subtitle: 'Sabores da tradição',
    items: [
      {
        id: 'pt1',
        name: 'Arroz de Pato',
        description: 'Arroz de pato no forno com chouriço',
        price: 12.5,
      },
      {
        id: 'pt2',
        name: 'Rojões à Moda do Minho',
        description: 'Carne de porco estufada com batata cozida',
        price: 11.5,
      },
      {
        id: 'pt3',
        name: 'Caldo Verde',
        description: 'Sopa tradicional com couve galega e chouriço',
        price: 4.5,
      },
      {
        id: 'pt4',
        name: 'Bitoque',
        description: 'Bife com ovo estrelado, batata frita e arroz',
        price: 10.5,
      },
    ],
  },
  {
    id: 'salads',
    title: 'Saladas',
    subtitle: 'Entradas frescas',
    items: [
      {
        id: 's1',
        name: 'Salada Mista',
        description: 'Alface, tomate, cebola, cenoura e milho',
        price: 5.5,
      },
      {
        id: 's2',
        name: 'Salada Caprese',
        description: 'Tomate, mozzarella, manjericão e azeite',
        price: 7,
      },
      {
        id: 's3',
        name: 'Salada Tio Fredo',
        description: 'Frango grelhado, queijo, croutons e molho especial',
        price: 8.5,
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Sobremesas',
    subtitle: 'Para fechar com doçura',
    items: [
      {
        id: 'd1',
        name: 'Mousse de Chocolate',
        description: 'Mousse caseira com raspas de chocolate',
        price: 4,
      },
      {
        id: 'd2',
        name: 'Pudim Abade de Priscos',
        description: 'Receita tradicional portuguesa',
        price: 4.5,
      },
      {
        id: 'd3',
        name: 'Cheesecake de Frutos Vermelhos',
        price: 4.5,
      },
      {
        id: 'd4',
        name: 'Gelado Artesanal',
        description: '2 bolas — pergunte os sabores do dia',
        price: 3.5,
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Bebidas',
    subtitle: 'Vinhos, cervejas e refrescos',
    items: [
      {
        id: 'dr1',
        name: 'Água 50cl',
        price: 1.5,
      },
      {
        id: 'dr2',
        name: 'Refrigerante',
        price: 2,
      },
      {
        id: 'dr3',
        name: 'Cerveja Super Bock 33cl',
        price: 2,
      },
      {
        id: 'dr4',
        name: 'Copo de Vinho Tinto / Branco',
        description: 'Vinho da casa do Minho',
        price: 2.5,
      },
      {
        id: 'dr5',
        name: 'Jarro de Vinho 1L',
        price: 8,
      },
      {
        id: 'dr6',
        name: 'Café',
        price: 1.2,
      },
    ],
  },
]

export const menuHero = {
  eyebrow: 'A nossa ementa',
  title: 'Ementa',
  subtitle:
    'Pizzas, massas, carnes, peixe e pratos da cozinha portuguesa — uma seleção dos sabores do Tio Fredo.',
}
