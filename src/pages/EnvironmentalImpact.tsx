import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FoodItem {
  name: string;
  co2: number;
  water: number;
  category: string;
  alternatives: string[];
}

const foodDatabase: FoodItem[] = [
  {
    name: 'Bistecca di Manzo',
    co2: 27,
    water: 15000,
    category: 'Carne',
    alternatives: ['Legumi', 'Tofu', 'Seitan']
  },
  {
    name: 'Pollo',
    co2: 6.9,
    water: 4325,
    category: 'Carne',
    alternatives: ['Pesce', 'Uova', 'Legumi']
  },
  {
    name: 'Riso',
    co2: 2.7,
    water: 2500,
    category: 'Cereali',
    alternatives: ['Quinoa', 'Orzo', 'Farro']
  },
  {
    name: 'Lenticchie',
    co2: 0.9,
    water: 1250,
    category: 'Legumi',
    alternatives: ['Ceci', 'Fagioli', 'Piselli']
  },
  {
    name: 'Maiale',
    co2: 12.1,
    water: 5988,
    category: 'Carne',
    alternatives: ['Pollo', 'Pesce', 'Legumi']
  },
  {
    name: 'Formaggio',
    co2: 13.5,
    water: 5000,
    category: 'Latticini',
    alternatives: ['Tofu', 'Frutta Secca', 'Legumi']
  },
  {
    name: 'Salmone',
    co2: 11.9,
    water: 4000,
    category: 'Pesce',
    alternatives: ['Sgombro', 'Sardine', 'Tofu']
  },
  {
    name: 'Uova',
    co2: 4.8,
    water: 3300,
    category: 'Proteine',
    alternatives: ['Legumi', 'Tofu', 'Quinoa']
  },
  {
    name: 'Patate',
    co2: 0.4,
    water: 287,
    category: 'Verdura',
    alternatives: ['Carote', 'Zucca', 'Pastinaca']
  },
  {
    name: 'Mele',
    co2: 0.3,
    water: 822,
    category: 'Frutta',
    alternatives: ['Pere', 'Arance', 'Pesche']
  }
];

const EnvironmentalImpact: React.FC = () => {
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [currentFood, setCurrentFood] = useState('');

  const addFood = () => {
    const food = foodDatabase.find(f => f.name === currentFood);
    if (food && !selectedFoods.find(f => f.name === food.name)) {
      setSelectedFoods([...selectedFoods, food]);
      setCurrentFood('');
    }
  };

  const removeFood = (foodName: string) => {
    setSelectedFoods(selectedFoods.filter(f => f.name !== foodName));
  };

  const chartData = {
    labels: selectedFoods.map(f => f.name),
    datasets: [
      {
        label: 'CO2 (kg)',
        data: selectedFoods.map(f => f.co2),
        backgroundColor: '#2a9d8f',
        borderColor: '#2a9d8f',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Acqua (L)',
        data: selectedFoods.map(f => f.water),
        backgroundColor: '#e9c46a',
        borderColor: '#e9c46a',
        borderWidth: 1,
        yAxisID: 'y1',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'CO2 (kg)'
        },
        grid: {
          color: 'var(--color-border)'
        },
        ticks: {
          callback: (value: number | string) => (typeof value === 'number' ? value.toLocaleString() : value)
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Acqua (L)'
        },
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: (value: number | string) => (typeof value === 'number' ? value.toLocaleString() : value)
        }
      },
      x: {
        grid: {
          color: 'var(--color-border)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="main-content">
      <h1>Calcolo dell'Impatto Ambientale</h1>
      
      <div className="card">
        <div className="form-group">
          <label className="form-label">Seleziona un alimento da aggiungere</label>
          <div className="input-group">
            <select
              className="form-select"
              value={currentFood}
              onChange={(e) => setCurrentFood(e.target.value)}
            >
              <option value="">Seleziona un alimento</option>
              {foodDatabase.map(food => (
                <option key={food.name} value={food.name}>{food.name}</option>
              ))}
            </select>
            <button className="button-primary" onClick={addFood} disabled={!currentFood}>
              Aggiungi
            </button>
          </div>
        </div>

        {selectedFoods.length > 0 ? (
          <div>
            <div className="chart-container" style={{ height: '400px' }}>
              <Bar
                data={chartData}
                options={chartOptions}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#264653]">Alternative Sostenibili</h3>
              <div className="space-y-2">
                {selectedFoods.map(food => (
                  <div key={food.name} className="bg-gray-50 p-3 rounded flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{food.name}</p>
                      <p className="text-sm text-gray-600">
                        Alternative: {food.alternatives.join(', ')}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFood(food.name)}
                      className="button-secondary text-sm"
                      aria-label={`Rimuovi ${food.name}`}
                    >
                      Rimuovi
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>Aggiungi degli alimenti per vedere il loro impatto ambientale</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalImpact;
