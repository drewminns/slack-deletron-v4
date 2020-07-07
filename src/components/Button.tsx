import React from 'react'
import clsx from 'clsx'

type ButtonProps = {
  text: string
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({ text, handleClick }: ButtonProps) => (
  <button onClick={handleClick} className={clsx('bg-blue-900', 'hover:bg-blue-700', 'text-white', 'text-sm')}>
    {text}
  </button>
)

Button.displayName = 'Button'
