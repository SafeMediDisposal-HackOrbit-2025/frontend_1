interface IndianFlagProps {
  className?: string;
}

export default function IndianFlag({ 
  className = "w-6 h-4"
}: IndianFlagProps) {
  return (
    <div className={`${className} relative overflow-hidden rounded-sm border border-gray-200`}>
      {/* Saffron stripe */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-orange-500"></div>
      
      {/* White stripe */}
      <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white"></div>
      
      {/* Green stripe */}
      <div className="absolute top-2/3 left-0 w-full h-1/3 bg-green-600"></div>
      
      {/* Ashoka Chakra - Navy Blue Wheel */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          className="text-blue-900"
          fill="currentColor"
        >
          {/* Outer circle */}
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          
          {/* Inner circle */}
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          
          {/* 24 spokes */}
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * 15) * (Math.PI / 180);
            const x1 = 12 + Math.cos(angle) * 3;
            const y1 = 12 + Math.sin(angle) * 3;
            const x2 = 12 + Math.cos(angle) * 9;
            const y2 = 12 + Math.sin(angle) * 9;
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
