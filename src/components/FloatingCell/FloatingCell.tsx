import React from 'react'
import './FloatingCell.scss';

interface Props {
  children: React.ReactElement;
  offsetTop: number;
  offsetLeft: number;
  unit: number;
}

export default function FloatingCell({ children, offsetTop, offsetLeft, unit }: Props) {
  const style = {
    width: `${unit}px`,
    height: `${unit}px`,
    top: `${offsetTop * unit}px`,
    left: `${offsetLeft * unit}px`
  };

  return (
    <div className="floating-cell" style={style}>
      {children}
    </div>
  );
};
