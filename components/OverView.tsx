"use client";
import { Bar,BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
type OverViewProps = {
  data: any[];
};
const OverView: React.FC<OverViewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#ffffff"
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="#3498db"
          barSize={20}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OverView;
