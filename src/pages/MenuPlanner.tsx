import React, { useState } from 'react';

interface Meal {
  id: string;
  name: string;
  type: string;
  category: string;
  portions: {
    vegetables: number;
    proteins: number;
    carbs: number;
    fruits: number;
  };
}

const mealOptions: Meal[] = [
  {
    id: 'pasta-verdure',
    name: 'Pasta con Verdure',
    type: 'pranzo',
    category: 'vegetariano',
    portions: { vegetables: 2, proteins: 1, carbs: 2, fruits: 0 }
  },
  {
    id: 'insalata-pollo',
    name: 'Insalata con Pollo',
    type: 'cena',
    category: 'onnivoro',
    portions: { vegetables: 2, proteins: 2, carbs: 1, fruits: 0 }
  },
  {
    id: 'bowl-quinoa',
    name: 'Bowl di Quinoa e Legumi',
    type: 'pranzo',
    category: 'vegano',
    portions: { vegetables: 2, proteins: 2, carbs: 2, fruits: 0 }
  }
];

const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const mealTypes = ['colazione', 'pranzo', 'cena'];

const MenuPlanner: React.FC = () => {
  const [selectedDiet, setSelectedDiet] = useState('onnivoro');
  const [weeklyMenu, setWeeklyMenu] = useState<{[key: string]: {[key: string]: Meal | null}}>({});
  const [warnings, setWarnings] = useState<string[]>([]);

  // Initialize empty weekly menu
  React.useEffect(() => {
    const initialMenu: {[key: string]: {[key: string]: Meal | null}} = {};
    days.forEach(day => {
      initialMenu[day] = {
        colazione: null,
        pranzo: null,
        cena: null
      };
    });
    setWeeklyMenu(initialMenu);
  }, []);

  const handleMealChange = (day: string, type: string, mealId: string) => {
    const meal = mealOptions.find(m => m.id === mealId) || null;
    setWeeklyMenu(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: meal
      }
    }));
    checkBalance(day);
  };

  const checkBalance = (day: string) => {
    const dayMeals = weeklyMenu[day];
    if (!dayMeals) return;

    const dailyTotals = {
      vegetables: 0,
      proteins: 0,
      carbs: 0,
      fruits: 0
    };

    Object.values(dayMeals).forEach(meal => {
      if (meal) {
        dailyTotals.vegetables += meal.portions.vegetables;
        dailyTotals.proteins += meal.portions.proteins;
        dailyTotals.carbs += meal.portions.carbs;
        dailyTotals.fruits += meal.portions.fruits;
      }
    });

    const newWarnings: string[] = [];
    if (dailyTotals.vegetables < 5) newWarnings.push(`${day}: Aggiungi più verdure`);
    if (dailyTotals.proteins < 3) newWarnings.push(`${day}: Proteine insufficienti`);
    if (dailyTotals.carbs < 4) newWarnings.push(`${day}: Carboidrati insufficienti`);
    if (dailyTotals.fruits < 2) newWarnings.push(`${day}: Aggiungi più frutta`);

    setWarnings(newWarnings);
  };

  return (
    <div className="main-content">
      <h1>Pianificatore Menu Settimanale</h1>

      <div className="card">
        <div className="form-group">
          <label className="form-label" htmlFor="diet-select">Tipo di Dieta</label>
          <select
            id="diet-select"
            className="form-select"
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
          >
            <option value="onnivoro">Onnivoro</option>
            <option value="vegetariano">Vegetariano</option>
            <option value="vegano">Vegano</option>
          </select>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Giorno</th>
                {mealTypes.map(type => (
                  <th key={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td>{day}</td>
                  {mealTypes.map(type => (
                    <td key={`${day}-${type}`}>
                      <select
                        className="form-select"
                        value={weeklyMenu[day]?.[type]?.id || ''}
                        onChange={(e) => handleMealChange(day, type, e.target.value)}
                      >
                        <option value="">Seleziona un pasto</option>
                        {mealOptions
                          .filter(meal => meal.type === type)
                          .filter(meal => selectedDiet === 'onnivoro' || 
                                        (selectedDiet === 'vegetariano' && meal.category !== 'carne') ||
                                        (selectedDiet === 'vegano' && meal.category === 'vegano'))
                          .map(meal => (
                            <option key={meal.id} value={meal.id}>
                              {meal.name}
                            </option>
                          ))
                        }
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {warnings.length > 0 && (
          <div className="warnings-container">
            <h3>Avvisi</h3>
            <div className="list-group">
              {warnings.map((warning, index) => (
                <div key={index} className="list-item warning">
                  {warning}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPlanner;
