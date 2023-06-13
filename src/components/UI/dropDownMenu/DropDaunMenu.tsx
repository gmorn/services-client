import React from 'react'
import styles from './DropDawnMenu.module.scss'

type Props = {
    children: React.ReactNode
    state: boolean
}

export default function DropDaunMenu({ children, state }: Props) {
  return (
    <div className={`${styles.menu} ${state ? styles.active : ""}`}>
        {children}
    </div>
  )
}