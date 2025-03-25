// change or modify the types as your requirement

export type Product = {
  _id: string;
  productName: string;
  category: string;
  description: string;
  aboutItem: string[];
  price: number;
  discount: number;
  rating: number;
  reviews?: Review[];
  brand?: any;
  color?: string[];
  stockItems: number;
  images: string[];
  thumbnailPath?:string,
  categorySlug:string,
  genre:string,
  
};



export type Review = {
  reviewerName: string;
  image: string;
  comment: string;
  rating:number
  date: Date;
};

export type SearchParams = {
  page: string;
  category: string;
  brand: string;
  search: string;
  min: string;
  max: string;
  color: string;
};

export type CartItem = {
  
  productId: string,
  productName?: string,
  quantity: number,
  price?: number,
  discount?: number,
  images?: string[],
  subTotal?: number,
  finalSubTotal?: number
};

export type Banner = {
  _id?:string,
  title:string,
  description: string,
  images: string[],
  button: string,
  discountText: string,
  link: string
}

export type Order = {

  fullName: string,
  phone: string,
  addressLine: string,
  ward: string,
  district: string,
  province: string,
  paymentMethod: string,
  notes: string,
  type: string,
  productId: string,
  quantity: string
}