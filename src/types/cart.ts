export interface CartItemType {
  id: string;
  type: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  date: string;
  time?: string;
  details: Record<string, string>;
}