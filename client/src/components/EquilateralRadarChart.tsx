import React from 'react';

interface EquilateralRadarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  width?: number;
  height?: number;
}

export function EquilateralRadarChart({ data, width = 280, height = 280 }: EquilateralRadarChartProps) {
  // Calculate equilateral triangle vertices
  // Center at (width/2, height/2)
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Radius to vertices - adjusted to leave space for labels
  const radius = 70;

  // Three vertices of equilateral triangle (120 degrees apart)
  // Top vertex at 90 degrees, then 210 and 330 degrees
  const angle1 = Math.PI / 2; // 90 degrees (top)
  const angle2 = Math.PI / 2 + (2 * Math.PI) / 3; // 210 degrees (bottom-left)
  const angle3 = Math.PI / 2 + (4 * Math.PI) / 3; // 330 degrees (bottom-right)

  const vertex1 = {
    x: centerX + radius * Math.cos(angle1),
    y: centerY - radius * Math.sin(angle1),
    label: data[0]?.name || 'Infraestructura',
    angle: angle1
  };

  const vertex2 = {
    x: centerX + radius * Math.cos(angle2),
    y: centerY - radius * Math.sin(angle2),
    label: data[1]?.name || 'Escalabilidad',
    angle: angle2
  };

  const vertex3 = {
    x: centerX + radius * Math.cos(angle3),
    y: centerY - radius * Math.sin(angle3),
    label: data[2]?.name || 'Calidad y Control',
    angle: angle3
  };

  // Map values (0-5) to positions along the triangle edges
  // For an equilateral triangle radar, each axis points from center to a vertex
  const getPointOnAxis = (vertexAngle: number, value: number) => {
    // value is 0-5, scale to 0-radius
    const scaledDist = (value / 5) * radius;
    
    return {
      x: centerX + scaledDist * Math.cos(vertexAngle),
      y: centerY - scaledDist * Math.sin(vertexAngle)
    };
  };

  // Get data points - each point is along the axis pointing to each vertex
  const point1 = getPointOnAxis(angle1, data[0]?.value || 0);
  const point2 = getPointOnAxis(angle2, data[1]?.value || 0);
  const point3 = getPointOnAxis(angle3, data[2]?.value || 0);

  // Draw grid lines (from center to vertices)
  const gridLines = [
    `M ${centerX} ${centerY} L ${vertex1.x} ${vertex1.y}`,
    `M ${centerX} ${centerY} L ${vertex2.x} ${vertex2.y}`,
    `M ${centerX} ${centerY} L ${vertex3.x} ${vertex3.y}`
  ];

  // Draw concentric triangles (for scale reference)
  const circles = [];
  for (let i = 1; i <= 5; i++) {
    const p1 = getPointOnAxis(angle1, i);
    const p2 = getPointOnAxis(angle2, i);
    const p3 = getPointOnAxis(angle3, i);
    circles.push(`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`);
  }

  // Triangle outline
  const trianglePath = `M ${vertex1.x} ${vertex1.y} L ${vertex2.x} ${vertex2.y} L ${vertex3.x} ${vertex3.y} Z`;

  // Data polygon
  const dataPath = `M ${point1.x} ${point1.y} L ${point2.x} ${point2.y} L ${point3.x} ${point3.y} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* Grid circles */}
      {circles.map((path, idx) => (
        <path
          key={`circle-${idx}`}
          d={path}
          fill="none"
          stroke="#E8E5DC"
          strokeWidth="0.5"
        />
      ))}

      {/* Grid lines from center */}
      {gridLines.map((path, idx) => (
        <path
          key={`grid-${idx}`}
          d={path}
          stroke="#E8E5DC"
          strokeWidth="0.5"
        />
      ))}

      {/* Triangle outline */}
      <path
        d={trianglePath}
        fill="none"
        stroke="#2C2C2C"
        strokeWidth="1"
      />

      {/* Data polygon */}
      <path
        d={dataPath}
        fill="#1A3A32"
        fillOpacity="0.6"
        stroke="#1A3A32"
        strokeWidth="1.5"
      />

      {/* Vertices (data points) */}
      <circle cx={point1.x} cy={point1.y} r="2" fill="#1A3A32" />
      <circle cx={point2.x} cy={point2.y} r="2" fill="#1A3A32" />
      <circle cx={point3.x} cy={point3.y} r="2" fill="#1A3A32" />

      {/* Labels at vertices - positioned with extra space to avoid cutoff */}
      <text
        x={vertex1.x}
        y={vertex1.y - 18}
        textAnchor="middle"
        fontSize="11"
        fill="#2C2C2C"
        fontWeight="500"
      >
        {vertex1.label}
      </text>
      <text
        x={vertex2.x - 25}
        y={vertex2.y + 6}
        textAnchor="middle"
        fontSize="11"
        fill="#2C2C2C"
        fontWeight="500"
      >
        {vertex2.label}
      </text>
      <text
        x={vertex3.x + 25}
        y={vertex3.y + 6}
        textAnchor="middle"
        fontSize="11"
        fill="#2C2C2C"
        fontWeight="500"
      >
        {vertex3.label}
      </text>


    </svg>
  );
}
