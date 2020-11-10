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

export interface Branches {
  address?: string,
  coordinates?: any,
  createTable?: boolean,
  experiences? : string[],
  foodHallId?: string,
  name: string,
  restaurantId?: string,
  state?: string,
  tip?: number,
  weekSchedule?: string[]

}