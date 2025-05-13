import { Product, baseProducts } from './products';

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface SeasonalityData {
  name: string;
  months: Month[];
}

export const seasonalProducts: SeasonalityData[] = [
  {
    name: 'Mele Bio Locali',
    months: [9, 10, 11, 12, 1, 2] // Autunno e Inverno
  },
  {
    name: 'Spinaci Freschi',
    months: [9, 10, 11, 12, 1, 2, 3] // Autunno e Inverno
  },
  {
    name: 'Carote Bio',
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // Tutto l'anno
  },
  {
    name: 'Arance',
    months: [12, 1, 2, 3] // Inverno
  },
  {
    name: 'Fragole',
    months: [4, 5, 6] // Primavera
  },
  {
    name: 'Pomodori Serra',
    months: [6, 7, 8, 9] // Estate
  },
  {
    name: 'Asparagi',
    months: [3, 4, 5] // Primavera
  },
  {
    name: 'Zucchine',
    months: [6, 7, 8, 9] // Estate
  },
  {
    name: 'Pesche',
    months: [6, 7, 8, 9] // Estate
  },
  {
    name: 'Cachi',
    months: [10, 11, 12] // Autunno
  },
  {
    name: 'Cavoli',
    months: [10, 11, 12, 1, 2] // Autunno e Inverno
  },
  {
    name: 'Piselli',
    months: [4, 5, 6] // Primavera
  }
];

// Categorie di prodotti che non seguono la stagionalità
const nonSeasonalCategories = ['Snack', 'Bevande'];

// Prodotti specifici che non seguono la stagionalità
const nonSeasonalProducts = [
  'Pasta Integrale',
  'Quinoa',
  'Lenticchie',
  'Ceci',
  'Yogurt Greco',
  'Uova Bio',
  'Snack Confezionati',
  'Merendine Confezionate',
  'Bevanda Gassata',
  'Patatine in Busta',
  'Bistecca di Manzo',
  'Salmone da allevamento'
];

export function isProductInSeason(productName: string, month: Month): boolean {
  // Se il prodotto è nella lista dei prodotti non stagionali, ritorna false
  if (nonSeasonalProducts.includes(productName)) {
    return false;
  }

  const product = seasonalProducts.find(p => p.name === productName);
  if (!product) {
    // Se il prodotto non è nella lista della stagionalità,
    // controlliamo se appartiene a una categoria non stagionale
    const baseProduct = baseProducts.find((p: Product) => p.name === productName);
    if (baseProduct && nonSeasonalCategories.includes(baseProduct.category)) {
      return false;
    }
    // Per tutti gli altri prodotti non in lista (come cereali e legumi)
    // assumiamo che siano sempre disponibili ma non "di stagione"
    return false;
  }
  return product.months.includes(month);
}

export function getCurrentSeasonalProducts(): string[] {
  const currentMonth = new Date().getMonth() + 1 as Month; // getMonth() returns 0-11
  return seasonalProducts
    .filter(product => product.months.includes(currentMonth))
    .map(product => product.name);
}

export function getNextSeasonalProducts(): string[] {
  const currentMonth = new Date().getMonth() + 1 as Month;
  const nextMonth = (currentMonth % 12 + 1) as Month;
  return seasonalProducts
    .filter(product => product.months.includes(nextMonth))
    .map(product => product.name);
}

// Utility per ottenere i mesi in formato leggibile
export function getMonthsString(months: Month[]): string {
  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  return months.map(m => monthNames[m - 1]).join(', ');
}
