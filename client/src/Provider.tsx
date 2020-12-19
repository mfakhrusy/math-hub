import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode
};

const Provider: React.FC<Props> = ({children}) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
};

export default Provider;
