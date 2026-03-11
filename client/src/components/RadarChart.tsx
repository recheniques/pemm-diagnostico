import { RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadar data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <PolarGrid stroke="#E8E5DC" />
        <PolarAngleAxis dataKey="name" tick={{ fill: '#2C2C2C', fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#7A7A7A', fontSize: 11 }} />
        <Radar name="Puntuación" dataKey="value" stroke="#1A3A32" fill="#1A3A32" fillOpacity={0.6} />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
