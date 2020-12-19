import React, { useEffect } from 'react';
import {renderMathInElement} from 'mathlive';
import 'mathlive/dist/mathlive-fonts.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': unknown;
    }
  }
}

interface Props {
  children: React.ReactNode;
};

const MathField: React.FC<Props> = ({children}) => {
  let ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref) {
      renderMathInElement(ref.current as NonNullable<typeof ref.current>);
    }
  }, [ref]);

  return (
    <math-field ref={ref}>
      {children}
    </math-field>
  )
};

export default MathField;
