import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';

interface FoodGroup {
  name: string;
  portions: string;
  benefits: string[];
  environmentalImpact: string;
  color: string;
  description: string;
  value?: number;
}

const foodGroups: FoodGroup[] = [
  {
    name: 'Frutta e Ortaggi',
    portions: '5+ porzioni al giorno',
    benefits: ['Vitamine', 'Minerali', 'Antiossidanti', 'Fibre', 'Sali minerali'],
    environmentalImpact: 'Basso impatto se di stagione e locale',
    color: '#2ecc71',
    description: 'Base fondamentale della dieta quotidiana'
  },
  {
    name: 'Pane, Pasta, Patate e Riso',
    portions: '4-5 porzioni al giorno',
    benefits: ['Carboidrati complessi', 'Energia', 'Fibre (se integrali)'],
    environmentalImpact: 'Medio-basso impatto',
    color: '#f1c40f',
    description: 'Fonti principali di carboidrati complessi'
  },
  {
    name: 'Olio e Frutta Secca',
    portions: '2-3 porzioni al giorno',
    benefits: ['Grassi buoni', 'Omega-3', 'Vitamina E'],
    environmentalImpact: 'Medio impatto',
    color: '#e67e22',
    description: 'Grassi sani essenziali'
  },
  {
    name: 'Latte e Yogurt',
    portions: '2 porzioni al giorno',
    benefits: ['Calcio', 'Proteine', 'Probiotici'],
    environmentalImpact: 'Medio impatto',
    color: '#3498db',
    description: 'Fonti di calcio e proteine'
  },
  {
    name: 'Carne Avicola, Pesce e Biscotti',
    portions: '2-3 volte a settimana',
    benefits: ['Proteine magre', 'Omega-3 (nel pesce)', 'Ferro'],
    environmentalImpact: 'Medio-alto impatto',
    color: '#9b59b6',
    description: 'Proteine magre e carboidrati semplici'
  },
  {
    name: 'Formaggio e Uova',
    portions: '1-2 volte a settimana',
    benefits: ['Proteine', 'Calcio', 'Vitamina D'],
    environmentalImpact: 'Alto impatto',
    color: '#e74c3c',
    description: 'Fonti proteiche da consumare con moderazione'
  },
  {
    name: 'Carne Bovina',
    portions: 'Max 1 volta a settimana',
    benefits: ['Proteine', 'Ferro', 'Vitamina B12'],
    environmentalImpact: 'Altissimo impatto',
    color: '#c0392b',
    description: 'Da limitare per salute e ambiente'
  },
  {
    name: 'Dolci',
    portions: 'Occasionalmente',
    benefits: ['Energia immediata', 'Gratificazione'],
    environmentalImpact: 'Variabile',
    color: '#95a5a6',
    description: 'Da consumare con grande moderazione'
  }
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: FoodGroup;
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="chart-tooltip">
        <p className="tooltip-title" style={{ color: data.color }}>{data.name}</p>
        <p className="tooltip-portions">Porzioni: {data.portions}</p>
      </div>
    );
  }
  return null;
};

const FoodPyramid: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<FoodGroup | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const data = foodGroups.map((group, index) => ({
    ...group,
    value: foodGroups.length - index,
  }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
    setSelectedGroup(foodGroups[index]);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
    setSelectedGroup(null);
  };

  return (
    <div className="main-content">
      <h1>Piramide Alimentare</h1>
      
      <div className="card chart-layout">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={-180}
                innerRadius={60}
                outerRadius={180}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-info">
          {selectedGroup ? (
            <div className="food-group-info">
              <h2 style={{ color: selectedGroup.color }}>
                {selectedGroup.name}
              </h2>
              
              <div className="info-section">
                <h3>Porzioni Raccomandate</h3>
                <p>{selectedGroup.portions}</p>
              </div>

              <div className="info-section">
                <h3>Descrizione</h3>
                <p>{selectedGroup.description}</p>
              </div>

              <div className="info-section">
                <h3>Benefici</h3>
                <ul className="benefits-list">
                  {selectedGroup.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h3>Impatto Ambientale</h3>
                <p>{selectedGroup.environmentalImpact}</p>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>Passa il mouse su una sezione del grafico per vedere i dettagli</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodPyramid;
