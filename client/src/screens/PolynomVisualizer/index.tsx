import React, { useEffect } from 'react';
import MathField from '../../uikit/Mathfield';

const PolynomVisualizerScreen: React.FC<{}> = () => {
  return (
    <MathField>
      $f(x)=sin(x)$
    </MathField>
  )
};

export default PolynomVisualizerScreen;
