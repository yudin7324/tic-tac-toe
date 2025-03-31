import { FC } from 'react'
import './button.scss'

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  color?: 'blue' |  'silver';
  label: string;
  onClick: () => void;
}

const Button:FC<ButtonProps> = ({ variant, color, label, onClick }) => {
  return (
    <button
      className={
        `button ${variant === 'secondary' && 'button--secondary'}
         ${color === 'blue' && 'button--blue'} 
         ${color === 'silver' && 'button--silver'} 
        `
      }
      type='button'
      aria-label='button'
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
