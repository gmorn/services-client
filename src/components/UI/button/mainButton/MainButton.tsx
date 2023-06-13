import React from 'react'
import styles from './MainButton.module.scss'

type Props = {
    children: string
    onClick?: () => void
    disabled?: boolean
}

export default function MainButton({ children, onClick, disabled }: Props) {
  return (
    <button 
        className={styles.button}
        onClick={onClick ? () => onClick() : () => {}}
        disabled={disabled}
    >
        {children}
    </button>
  )
}