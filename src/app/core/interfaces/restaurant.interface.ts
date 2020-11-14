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
  id?:string,
  mainImage?:string,
  menuCategoryId?:string,
  name?:string,
  price?:number,
  recommended?:boolean
}
export interface MenuDatail{
  additions?:[],
  customizations?: Customizations[],
  id?:string,
  images?: [],
  options?: [],
  sideDish?:[],
  sideDishes?:[],
}
export interface  additions{
  active:boolean,
  id: string,
  image:string,
  name:string,
  price:number,
}

export interface  Customizations{
  active:boolean,
  id: string,
  image:string,
  name:string,
}
export interface  options{
  active:boolean,
  description:string,
  id: string,
  item:[]
}
export interface  item{
  id: string,
  image:string,
  name:string,
  price:number,
  maximum:boolean,
  required:boolean,
  select:number,
  title:string,
}
export interface sideDish {
  active: boolean,
  id:string,
  items:[]
}
export interface  items{
  id: string,
  image:string,
  name:string,
  price:number,
  title:string,
}
