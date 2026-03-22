import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';

const data = [
  { subject: 'React', A: 120, fullMark: 150 },
  { subject: 'Python', A: 98, fullMark: 150 },
  { subject: 'Node.js', A: 86, fullMark: 150 },
  { subject: 'Communication', A: 99, fullMark: 150 },
  { subject: 'Leadership', A: 85, fullMark: 150 },
  { subject: 'System Design', A: 65, fullMark: 150 },
];

const SkillRadar = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#00f5ff', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar name="Skills" dataKey="A" stroke="#00f5ff" fill="#00f5ff" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;
