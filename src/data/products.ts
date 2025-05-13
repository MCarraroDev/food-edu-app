import { isProductInSeason } from './seasonality';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  nutritionalValue: number;
  sustainability: number;
  seasonal?: boolean; // Ora è opzionale perché verrà calcolato dinamicamente
}

export const baseProducts: Product[] = [
  // Prodotti freschi che seguono la stagionalità
  {
    id: 1,
    name: 'Mele Bio Locali',
    category: 'Frutta',
    price: 2.50,
    nutritionalValue: 8,
    sustainability: 9
  },
  {
    id: 2,
    name: 'Pasta Integrale',
    category: 'Cereali',
    price: 1.80,
    nutritionalValue: 7,
    sustainability: 7
  },
  {
    id: 3,
    name: 'Lenticchie',
    category: 'Legumi',
    price: 2.20,
    nutritionalValue: 9,
    sustainability: 8
  },
  {
    id: 4,
    name: 'Spinaci Freschi',
    category: 'Verdura',
    price: 2.00,
    nutritionalValue: 9,
    sustainability: 8
  },
  {
    id: 5,
    name: 'Yogurt Greco',
    category: 'Latticini',
    price: 2.80,
    nutritionalValue: 8,
    sustainability: 6
  },
  {
    id: 6,
    name: 'Quinoa',
    category: 'Cereali',
    price: 3.50,
    nutritionalValue: 9,
    sustainability: 7
  },
  {
    id: 7,
    name: 'Carote Bio',
    category: 'Verdura',
    price: 1.50,
    nutritionalValue: 7,
    sustainability: 9
  },
  {
    id: 8,
    name: 'Uova Bio',
    category: 'Proteine',
    price: 3.00,
    nutritionalValue: 9,
    sustainability: 7
  },
  {
    id: 9,
    name: 'Arance',
    category: 'Frutta',
    price: 2.30,
    nutritionalValue: 8,
    sustainability: 8
  },
  {
    id: 10,
    name: 'Ceci',
    category: 'Legumi',
    price: 1.90,
    nutritionalValue: 8,
    sustainability: 9
  },
  // Prodotti meno sostenibili o importati
  {
    id: 11,
    name: 'Fragole',
    category: 'Frutta',
    price: 4.50,
    nutritionalValue: 6,
    sustainability: 3
  },
  {
    id: 12,
    name: 'Pomodori Serra',
    category: 'Verdura',
    price: 3.20,
    nutritionalValue: 5,
    sustainability: 4
  },
  {
    id: 13,
    name: 'Avocado Importato',
    category: 'Frutta',
    price: 3.80,
    nutritionalValue: 7,
    sustainability: 2
  },
  {
    id: 14,
    name: 'Salmone da allevamento',
    category: 'Pesce',
    price: 18.90,
    nutritionalValue: 7,
    sustainability: 3
  },
  {
    id: 15,
    name: 'Snack Confezionati',
    category: 'Snack',
    price: 2.50,
    nutritionalValue: 2,
    sustainability: 2
  },
  {
    id: 16,
    name: 'Bistecca di Manzo',
    category: 'Carne',
    price: 22.00,
    nutritionalValue: 6,
    sustainability: 1
  },
  {
    id: 17,
    name: 'Asparagi',
    category: 'Verdura',
    price: 5.50,
    nutritionalValue: 6,
    sustainability: 3
  },
  {
    id: 18,
    name: 'Merendine Confezionate',
    category: 'Snack',
    price: 3.20,
    nutritionalValue: 3,
    sustainability: 2
  },
  {
    id: 19,
    name: 'Bevanda Gassata',
    category: 'Bevande',
    price: 1.80,
    nutritionalValue: 1,
    sustainability: 2
  },
  {
    id: 20,
    name: 'Patatine in Busta',
    category: 'Snack',
    price: 1.50,
    nutritionalValue: 2,
    sustainability: 2
  }
];

// Funzione per ottenere i prodotti con la stagionalità calcolata dinamicamente
export function getProducts(): Product[] {
  const currentMonth = new Date().getMonth() + 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  return baseProducts.map(product => ({
    ...product,
    seasonal: isProductInSeason(product.name, currentMonth)
  }));
}

// Esporta i prodotti con stagionalità calcolata
export const products = getProducts();
