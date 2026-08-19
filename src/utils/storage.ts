import { Product } from '../types/product';
import { INITIAL_PRODUCTS } from '../data/presetProducts';

const STORAGE_KEY = 'house_of_parlay_products_v2';

function normalizeCurrency(product: Product): Product {
  return {
    ...product,
    currency: 'ZAR',
  };
}

export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProducts(INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const normalized = parsed.map(normalizeCurrency);
      saveProducts(normalized);
      return normalized;
    }
    saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  } catch (err) {
    console.error('Failed to parse products from local storage:', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  try {
    const normalized = products.map(normalizeCurrency);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.error('Failed to save products to local storage:', err);
  }
}

export function resetToPresetProducts(): Product[] {
  saveProducts(INITIAL_PRODUCTS);
  return INITIAL_PRODUCTS;
}
