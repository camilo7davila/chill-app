export interface Restaurant {
  id: string,
  name: string,
  backgroundImage?: string,
  description?: string,
  logoImage?: string,
  mainImage?: string,
  restaurantCategoriesId?: string[];
}

export interface Categories {
  description: string,
  image: string,
  name: string,
  active?: boolean,
  id?: string
}