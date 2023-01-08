export type Product = {
  id: number;
  slug: string;
  image: string;
  name: string;
  brand: string;
  price: number;
  countInStock: number;
};

export type Cart = {
  productId: number;
  quantity: number;
};
