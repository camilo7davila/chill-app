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
  active?: boolean,
  description?: string,
  image?: string,
  id?: string,
  mainImage?: string,
  menuCategoryId?: string,
  name?: string,
  price?: number,
  recommended?: boolean
}
export interface MenuDatail{
  additions?: Addition[];
  customizations?: Customizations[];
  id?: string;
  images?: string[];
  options?: Option[];
  sideDish?: any[];
}
export interface  Addition{
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
export interface  Option{
  active: boolean;
  description: string;
  id: string;
  items: Item[];
  maximum: boolean;
  required: boolean;
  select: number;
  title: string;
}
export interface  Item{
  id: string,
  image:string,
  name:string,
  price:number,
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
