import React from 'react'
import styles from './Title.module.scss'


type Props = {
    children: string
}

export default function Title({ children }: Props) {
  return (
    <div className={styles.title}>{children}</div>
  )
}