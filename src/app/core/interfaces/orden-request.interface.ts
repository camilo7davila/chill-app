export interface OrderRequest{
    bill: bill[] ;
    dishes: dishes[];
    order: order[];
    orderState: number;
    restaurant: restaurant[];
    user: user[];
  }
  export interface bill{
    payBy:number;
    payTo:number;
    paymentMethod:number;
    subTotal:number;
    tip:number;
    totalOrder:number;
    totalPaid:number;
  }
  export interface dishes{
    available:boolean;
    check:boolean;
    dateCreated:dateCreated[]
    dishId:string;
    
    
  }
  export interface dateCreated{
    nanoseconds:number;
    seconds:number;
  }
  export interface order{
  
  }
  export interface restaurant{
  
  }
  export interface user{
  
  }