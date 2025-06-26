import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface TimerArcProps {
  progress: number; // от 0 до 1, къде е текущото състояние на таймера
  size?: number; // размер на SVG (ширина/височина)
  strokeWidth?: number;
  remainingColor?: string;
  elapsedColor?: string;
}

const TimerArc: React.FC<TimerArcProps> = ({
  progress,
  size = 220,
  strokeWidth = 30,
  remainingColor = '#102441',
  elapsedColor = '#AEC5D6',
}) => {
  // Радиусът на окръжността
  const radius = (size - strokeWidth) / 2;

  // Дължината на цялата дъга - тук за полукръг е π * r
  const circumference = Math.PI * radius;

  // Дължината на изминатата част (elapsed)
  const strokeDashoffset = circumference * (1 - progress);

  // Път за полукръг - рисува от ляво надясно (за да е долна половина)
  // Използваме SVG path команда за арка:
  // M (start point) A (radiusX radiusY rotation largeArcFlag sweepFlag end point)
  const startX = strokeWidth / 2;
  const startY = size / 2;
  const endX = size - strokeWidth / 2;
  const endY = size / 2;

  const path = `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 0 1 ${endX} ${endY}
  `;

  return (
    <Svg width={size} height={size / 2}>
      {/* Фонът на арката - изтеклото време */}
      <Path
        d={path}
        stroke={elapsedColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Прогресът - оставащото време */}
      <Path
        d={path}
        stroke={remainingColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default TimerArc;
