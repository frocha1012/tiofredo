import type {

  Feature,

  NavLink,

  SocialLink,

  Specialty,

  Testimonial,

  AboutHighlight,

} from '@/types'



export const company = {

  name: 'Pizzaria Tio Fredo',

  shortName: 'Tio Fredo',

  tagline: 'Pizza artesanal & cozinha portuguesa',

  description:

    'Restaurante e pizzaria no centro de Ponte da Barca, com pizzas, massas e pratos da tradição portuguesa num ambiente acolhedor.',

  phone: '+351 258 455 600',

  phoneRaw: '+351258455600',

  email: 'tiofredo64@hotmail.com',

  address: 'Rua Comendador José Oliveira Carneiro Bouças, Loja 17',

  city: '4980-624 Ponte da Barca',

  country: 'Portugal',

  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1185.939!2d-8.4152056!3d41.8062613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2508def08a0397%3A0x3ea0fed7232507f3!2sTio%20Fredo!5e0!3m2!1spt!2spt!4v1719500000000!5m2!1spt!2spt',
  mapsUrl: 'https://maps.app.goo.gl/5MYzwNEK4hquWdLC8',

  schedule: {

    weekdays: 'Seg–Sex: 08h00–01h00',

    weekend: 'Sáb: 11h30–01h00 · Dom: 11h00–01h00',

    note: 'Take away disponível. Horário sujeito a alterações.',

  },

}



export const navLinks: NavLink[] = [

  { label: 'Início', href: '/#inicio' },

  { label: 'Ementa', href: '/menu', isPage: true },

  { label: 'Sobre', href: '/#sobre' },

  { label: 'Reservas', href: '/#reservas' },

  { label: 'Contactos', href: '/#contactos' },

]



export const hero = {

  eyebrow: 'Pizzaria Tio Fredo',

  headline: ['Sabores para', 'partilhar à mesa.'],

  subtitle:

    'No coração de Ponte da Barca, pizzas artesanais e cozinha portuguesa num espaço acolhedor — uma referência local há anos.',

  image:

    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=80',

  imageAlt: 'Ambiente de restaurante',

}



export const about = {

  eyebrow: 'Sobre nós',

  title: 'Bem-vindos ao Tio Fredo',

  description:

    'No centro de Ponte da Barca, a Pizzaria Tio Fredo é um espaço informal e acolhedor. Pizzas de massa fina, pratos da cozinha portuguesa e italiana — com destaque para o bife no espeto, o bacalhau e a posta mirandesa. Take away disponível.',

  image:

    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=80',

  imageAlt: 'Salão do restaurante',

  highlights: [

    {

      id: 'pizza',

      title: 'Pizza Autêntica',

      description:

        'Massa fina e receitas preparadas com ingredientes frescos.',

      icon: 'pizza',

    },

    {

      id: 'cuisine',

      title: 'Cozinha Portuguesa e Italiana',

      description:

        'Pizzas clássicas e pratos favoritos da tradição portuguesa.',

      icon: 'wine',

    },

    {

      id: 'atmosphere',

      title: 'Ambiente Familiar',

      description:

        'Um espaço acolhedor para amigos e famílias.',

      icon: 'users',

    },

  ] satisfies AboutHighlight[],

}



export const specialties: Specialty[] = [

  {

    id: 'pizza',

    title: 'Pizzas',

    description: 'Cerca de 28 variedades de pizza artesanal — a especialidade da casa.',

    image:

      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',

  },

  {

    id: 'portuguese',

    title: 'Cozinha Portuguesa',

    description: 'Pratos da tradição portuguesa, incluindo bacalhau e especialidades regionais.',

    image:

      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',

  },

  {

    id: 'fish',

    title: 'Peixe',

    description: 'Bacalhau e outros pratos de peixe preparados com rigor.',

    image:

      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',

  },

  {

    id: 'steaks',

    title: 'Carnes',

    description: 'Bife no espeto, posta mirandesa e pratos de carne grelhada.',

    image:

      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',

  },

  {

    id: 'pasta',

    title: 'Massas',

    description: 'Massas clássicas italianas, da cozinha tradicional à casa.',

    image:

      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',

  },

  {

    id: 'desserts',

    title: 'Sobremesas',

    description: 'Para fechar a refeição com doçura.',

    image:

      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',

  },

]



export const features: Feature[] = [

  {

    id: 'kitchen',

    title: 'Cozinha variada',

    description:

      'Pizzas, massas, carnes, peixe e pratos da cozinha portuguesa e italiana.',

    icon: 'flame',

  },

  {

    id: 'atmosphere',

    title: 'Ambiente acolhedor',

    description:

      'Restaurante informal no centro de Ponte da Barca, ideal para refeições descontraídas.',

    icon: 'home',

  },

  {

    id: 'menu',

    title: 'Take away',

    description: 'Leve connosco os sabores do Tio Fredo para casa.',

    icon: 'leaf',

  },

  {

    id: 'service',

    title: 'Referência local',

    description:

      'Instituição na região, com pratos saborosos a preços convidativos.',

    icon: 'heart',

  },

]



export const socialLinks: SocialLink[] = [

  {

    label: 'Facebook',

    href: 'https://www.facebook.com/tiofredorestaurante/',

    icon: 'facebook',

  },

]



export const footerLinks = [

  { label: 'Início', href: '/#inicio' },

  { label: 'Ementa', href: '/menu' },

  { label: 'Sobre', href: '/#sobre' },

  { label: 'Reservas', href: '/#reservas' },

  { label: 'Contactos', href: '/#contactos' },

]



export const testimonials = {

  eyebrow: 'Testemunhos',

  title: 'Opiniões dos nossos clientes',

  subtitle:

    'Histórias de quem partilha connosco a mesa — pizza, tradição e um ambiente que convida a ficar.',

  items: [

    {

      id: '1',

      quote:

        'A massa da pizza tem aquele sabor caseiro que faz toda a diferença. Serviço atencioso e um salão acolhedor — ideal para jantar em família.',

      author: 'Ana Ferreira',

      role: 'Cliente habitual',

    },

    {

      id: '2',

      quote:

        'Surpreendeu-nos a variedade da ementa: pizza excelente e pratos portugueses muito bem executados. Voltámos na semana seguinte.',

      author: 'Miguel Santos',

      role: 'Visita em grupo',

    },

    {

      id: '3',

      quote:

        'Ambiente descontraído, porções generosas e uma equipa que nos fez sentir em casa. Recomendo sem hesitar.',

      author: 'Catarina Oliveira',

      role: 'Jantar de aniversário',

    },

    {

      id: '4',

      quote:

        'A pizza estava excelente e o bacalhau surpreendeu-nos pela qualidade. Voltaremos com toda a certeza.',

      author: 'João Ribeiro',

      role: 'Visita em família',

    },

    {

      id: '5',

      quote:

        'Take away impecável e comida quente. Perfeito para levar para casa depois de um dia na região.',

      author: 'Sofia Martins',

      role: 'Take away',

    },

  ] satisfies Testimonial[],

}



export const contactSection = {

  subtitle: 'Encontre-nos no centro de Ponte da Barca. Ligue ou envie-nos um email para reservas e informações.',

}

