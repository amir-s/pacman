import React from 'react';
import './Pacman.scss';

type Direction = "top" | "right" | "bottom" | "left";

interface Props {
  direction: Direction;
}

export default function Pacman({direction}: Props) {
  return (
    <div className={`pacman pacman-${direction}`}>
      <div className="pacman__eye"></div>
      <div className="pacman__mouth"></div>
    </div>
  );
}
