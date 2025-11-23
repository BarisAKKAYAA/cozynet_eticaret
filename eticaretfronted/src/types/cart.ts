export interface CartItem {
  productId:number | string;
  productName: string;
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}