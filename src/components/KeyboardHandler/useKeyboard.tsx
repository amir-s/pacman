import {useState, useEffect} from "react"

type Direction = "top" | "right" | "bottom" | "left";

export default function useKeyboard(initialPosition: any) {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState<Direction>('right');

  useEffect(() => {
    function handleKeyDown(evt: KeyboardEvent) {
      switch(evt.code) {
        case 'ArrowLeft':
        case 'KeyA':
          setDirection('left');
          setPosition((position) => ({...position, x: position.x - 1}));
          break;
        case 'ArrowUp':
        case 'KeyW':
          setDirection('top');
          setPosition((position) => ({...position, y: position.y - 1}));
          break;
        case 'ArrowRight':
        case 'KeyD':
          setDirection('right');
          setPosition((position) => ({...position, x: position.x + 1}));
          break;
        case 'ArrowDown':
        case 'KeyS':
          setDirection('bottom');
          setPosition((position) => ({...position, y: position.y + 1}));
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    position,
    direction,
  }
}
