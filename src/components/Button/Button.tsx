import { FC } from "react";
import "./button.scss";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  color?: "blue" | "silver";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ variant, color, label, onClick }) => {
  const className = `button ${variant === "secondary" ? "button--secondary" : ""} 
    ${color === "blue" ? "button--blue" : ""} 
    ${color === "silver" ? "button--silver" : ""}`;

  return (
    <button type="button" className={className} aria-label="button" onClick={onClick}>
      {label}
    </button>
  )
};

export default Button;
