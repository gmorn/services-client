import React from 'react'
import styles from './FormButton.module.scss'

type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

export default function FormButton({ children, disabled, onClick }: Props) {
  return (
    <button
        className={`${ styles.formButton } ${ disabled ? ` ${ styles.disabled }` : '' }`}
        disabled={disabled}
        onClick={onClick ? () => onClick() : () => {}}
    >
        {children}
    </button>
  )
}