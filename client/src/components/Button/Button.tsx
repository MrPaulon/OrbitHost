import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

interface ButtonProps {
  to: string;
  children: ReactNode;
}

const Button = ({ to, children }: ButtonProps) => {
  return (
    <div className="button">
      <Link className="go" to={to}>
        {children}
      </Link>
    </div>
  );
};

export default Button;