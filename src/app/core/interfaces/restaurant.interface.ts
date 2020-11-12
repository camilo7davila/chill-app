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
  experiences?: string[],
  foodHallId?: string,
  name?: string,
  restaurantId?: string,
  state?: string,
  tip?: number,
  weekSchedule?: string[];
  id?: string;
}

export interface BranchesMC{
  backgroundImage?: string,
  chillCategory?: boolean,
  layoutImage?: string,
  main?: number,
  name?: string
}
export interface BranchesM{
  active?:boolean,
  description?:string,
  image?:string,
  mainImage?:string,
  menuCategoryId?:string,
  name?:string,
  price?:number,
  recommended?:boolean
}
