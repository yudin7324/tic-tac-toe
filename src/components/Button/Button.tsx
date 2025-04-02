import { FC } from "react";
import { Link } from "react-router-dom";
import "./button.scss";

interface ButtonProps {
  as?: "button" | "link";
  to?: string;
  variant?: "primary" | "secondary";
  color?: "blue" | "silver";
  label: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ as = "button", to, variant, color, label, onClick }) => {
  const className = `button ${variant === "secondary" ? "button--secondary" : ""} 
    ${color === "blue" ? "button--blue" : ""} 
    ${color === "silver" ? "button--silver" : ""}`;

  return as === "link" && to ? (
    <Link to={to} className={className} aria-label="button">
      {label}
    </Link>
  ) : (
    <button type="button" className={className} aria-label="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
