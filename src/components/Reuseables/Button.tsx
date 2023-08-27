import React, { ReactNode } from "react";
interface ButtonProps {
  className?: string;
  id?: string;
  children?: string | ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  onKeyDown?: () => void;
}
const Button: React.FC<ButtonProps> = ({
  className,
  id,
  children,
  type,
  disabled,
  onClick,
  onKeyDown,
}) => {
  return (
    <button
      className={className}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
};

export default Button;
