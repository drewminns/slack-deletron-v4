import React from 'react'

type ButtonProps = {
  text: string
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({ text, handleClick }: ButtonProps) => (
  <button onClick={handleClick} className={['bg-blue-900', 'hover:bg-blue-700', 'text-white', 'text-sm'].join(' ')}>
    {text}
  </button>
)

Button.displayName = 'Button'
