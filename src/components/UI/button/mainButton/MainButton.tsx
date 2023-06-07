import React from 'react'
import styles from './MainButton.module.scss'

type Props = {
    children: string
    onClick?: () => void
}

export default function MainButton({ children, onClick }: Props) {
  return (
    <button 
        className={styles.button}
        onClick={onClick ? () => onClick() : () => {}}
    >
        {children}
    </button>
  )
}