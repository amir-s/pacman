import React from 'react';
import {ReactComponent as GhostSvg} from './ghost.svg';
import './Ghost.scss';

type GhostName = 'clyde' | 'blinky' | 'pinky' | 'inky';

interface Props {
  name: GhostName;
}

export default function Ghost({name}: Props) {
  return (
    <div className={`ghost ${name}`}>
      <GhostSvg />
    </div>
  )
}
