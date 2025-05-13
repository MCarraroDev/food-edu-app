import React, { useState, useEffect } from 'react';
import { Product, getProducts } from '../data/products';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Aggiorna i prodotti ogni minuto per tenere conto dei cambi di giorno
    const updateProducts = () => setProducts(getProducts());
    updateProducts(); // Carica i prodotti iniziali
    
    const interval = setInterval(updateProducts, 60000);
    return () => clearInterval(interval);
  }, []);

  return products;
};

const SmartShopping: React.FC = () => {
  const [budget, setBudget] = useState<number>(30);
  const [cart, setCart] = useState<Product[]>([]);
  const products = useProducts();

  const addToCart = (product: Product) => {
    if (getTotalSpent() + product.price <= budget) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalSpent = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getAverageNutritionalValue = () => {
    if (cart.length === 0) return 0;
    return cart.reduce((total, item) => total + item.nutritionalValue, 0) / cart.length;
  };

  const getAverageSustainability = () => {
    if (cart.length === 0) return 0;
    return cart.reduce((total, item) => total + item.sustainability, 0) / cart.length;
  };

  const getSeasonalPercentage = () => {
    if (cart.length === 0) return 0;
    const seasonal = cart.filter(item => item.seasonal).length;
    return (seasonal / cart.length) * 100;
  };

  return (
    <div className="main-content">
      <h1>Spesa "smart"</h1>
      
      <div className="card">
        <div className="input-field-container">
          <label htmlFor="budget">Il tuo Budget:</label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="input-field"
            min="0"
          />
        </div>

        <div className="shopping-grid">
          <div className="products-list">
            <h2>Prodotti Disponibili</h2>
            <div className="products-container">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">€{product.price.toFixed(2)}</p>
                    {product.seasonal && (
                      <p className="seasonal-tag">
                        🌱 Di stagione
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={getTotalSpent() + product.price > budget}
                    className="button-primary"
                  >
                    Aggiungi
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-section">
            <h2>Il tuo Carrello</h2>
            <div className="cart-container">
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name} - €{item.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-button"
                      aria-label="Rimuovi dal carrello"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <p className="total">Totale: €{getTotalSpent().toFixed(2)}</p>
                <p className="remaining">Rimasto: €{(budget - getTotalSpent()).toFixed(2)}</p>
              </div>

              <div className="cart-analysis">
                <h3>Analisi della Spesa</h3>
                <div className="analysis-grid">
                  <div className="analysis-item">
                    <span>Valore Nutrizionale</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${getAverageNutritionalValue() * 10}%` }}
                      />
                    </div>
                    <span>{getAverageNutritionalValue().toFixed(1)}/10</span>
                  </div>
                  <div className="analysis-item">
                    <span>Sostenibilità</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${getAverageSustainability() * 10}%` }}
                      />
                    </div>
                    <span>{getAverageSustainability().toFixed(1)}/10</span>
                  </div>
                  <div className="analysis-item">
                    <span>Prodotti di Stagione</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${getSeasonalPercentage()}%` }}
                      />
                    </div>
                    <span>{getSeasonalPercentage().toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartShopping;
