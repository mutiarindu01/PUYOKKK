import React from 'react';

interface StatItem {
  value: string;
  label: string;
  color?: string;
}

interface CompactStatsProps {
  stats: StatItem[];
  className?: string;
}

const CompactStats: React.FC<CompactStatsProps> = ({ stats, className = "" }) => {
  return (
    <div className={`compact-stats ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="compact-stat">
          <div 
            className="compact-stat-value" 
            style={{ color: stat.color || '#10b981' }}
          >
            {stat.value}
          </div>
          <div className="compact-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CompactStats;
