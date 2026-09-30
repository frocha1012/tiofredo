export interface NavLink {
  label: string
  href: string
  isPage?: boolean
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number | null
}

export interface MenuCategory {
  id: string
  title: string
  subtitle?: string
  items: MenuItem[]
}

export interface Specialty {
  id: string
  title: string
  description: string
  image: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: 'leaf' | 'heart' | 'flame' | 'home'
}

export interface SocialLink {
  label: string
  href: string
  icon: 'instagram' | 'facebook'
}

export interface AboutHighlight {
  id: string
  title: string
  description: string
  icon: 'pizza' | 'wine' | 'users'
}
