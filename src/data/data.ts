import type { Product } from "../components/ProductCard";

export const initialProducts: Product[] = [
  { id: 1, name: 'Smartphone', category: 'Electronics', price: 699 },
  { id: 2, name: 'Jeans', category: 'Clothing', price: 49.99 },
  { id: 3, name: 'Novel Book', category: 'Books', price: 19.5 },
  { id: 4, name: 'Chocolate Bar', category: 'Food', price: 2.5 },
];

export const categories = ['Electronics', 'Clothing', 'Books', 'Food'];