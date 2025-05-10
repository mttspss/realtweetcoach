'use client';

// import CalendarHeatmap from 'react-calendar-heatmap'; // Esempio di libreria, da installare
// import 'react-calendar-heatmap/dist/styles.css'; // Stili per la libreria

interface HeatMapDataPoint {
  date: string; // Formato YYYY-MM-DD
  count: number;
}

interface HeatMapProps {
  // data: HeatMapDataPoint[];
  // Potrebbe accettare anche startDate, endDate, etc.
}

export function HeatMap({}: HeatMapProps) {
  // Dati di esempio
  const exampleData: HeatMapDataPoint[] = [
    { date: '2024-01-01', count: 2 },
    { date: '2024-01-15', count: 5 },
    { date: '2024-02-10', count: 1 },
    // ... altri dati
  ];

  return (
    <div className="p-4 rounded-lg bg-gray-800/30">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Tweet Activity Heatmap (Placeholder)</h3>
      <div className="bg-gray-700/50 h-48 flex items-center justify-center rounded">
        <p className="text-gray-400">Heatmap Component - Integration Pending</p>
        {/* 
        <CalendarHeatmap
          startDate={new Date('2024-01-01')}
          endDate={new Date('2024-12-31')}
          values={exampleData}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${Math.min(value.count, 4)}`; // Esempio di classificazione colore
          }}
          tooltipDataAttrs={value => {
            return {
              'data-tip': `${value.date}: ${value.count} tweets`,
            };
          }}
          // Altre props per personalizzazione...
        />
        <style jsx global>{`
          .react-calendar-heatmap .color-empty {
            fill: #374151; // gray-700
          }
          .react-calendar-heatmap .color-scale-1 {
            fill: #06b6d4; // cyan-500 (leggero)
          }
          .react-calendar-heatmap .color-scale-2 {
            fill: #0891b2; // cyan-600
          }
          .react-calendar-heatmap .color-scale-3 {
            fill: #0e7490; // cyan-700
          }
          .react-calendar-heatmap .color-scale-4 {
            fill: #155e75; // cyan-800 (scuro)
          }
          // Aggiungi react-tooltip per i tooltip se usi data-tip
        `}</style>
         */}
      </div>
    </div>
  );
} 