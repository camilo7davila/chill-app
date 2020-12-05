import { Timestamp } from 'rxjs/internal/operators/timestamp';

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

export interface BranchesMC {
  backgroundImage?: string,
  chillCategory?: boolean,
  layoutImage?: string,
  main?: number,
  name?: string,
  id?: string;
}
export interface BranchesM {
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
export interface MenuDatail {
  additions?: Addition[],
  customizations?: Customizations[],
  id?: string,
  images?: string[],
  options?: Option[],
  sideDish?: SideDish[],
  totalPrice?: number,
  quantityTotal?: number,
  idBranch?: any,
  nameMenu?: string,
  imagenMenu?: string,
}
export interface Addition {
  active: boolean,
  id: string,
  image: string,
  name: string,
  price: number,
  total?: number,
  activeUi?: boolean
}

export interface Customizations {
  active: boolean,
  id: string,
  image: string,
  name: string,
}
export interface Option {
  active: boolean;
  description: string;
  id: string;
  items: Item[];
  maximum: boolean;
  required: boolean;
  select: number;
  title: string;
}
export interface Item {
  id: string,
  image: string,
  name: string,
  price: number,
}
export interface SideDish {
  active: boolean,
  id: string,
  items: Items[],
  title: string,
  total?: number
}
export interface Items {
  id: string,
  image: string,
  name: string,
  price: number,
  total?: number
}

export interface User {
  address?: string;
  authenticationProvider?: authentication[] ;
  birthday?: Date;
  creationDate?:Date;
  description?:string;
  email?: string;
  image?: string;
  lastName?: string;
  name?: string;
  phoneNumber?:string;
  sex?:number;
  username?:string;
}
export interface authentication{
  auth?:string;
  provider?:string;
}

