import { useState, useEffect } from 'react';
import { VIEWBOX } from '../utils/constants';

export function useViewBoxHeight(): number {
  const [height, setHeight] = useState(() => calcHeight());

  useEffect(() => {
    const onResize = () => setHeight(calcHeight());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return height;
}

function calcHeight(): number {
  const aspect = window.innerHeight / window.innerWidth;
  const h = Math.round(VIEWBOX.width * aspect);
  return Math.max(h, VIEWBOX.height);
}
