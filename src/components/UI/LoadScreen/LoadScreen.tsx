import React from 'react'
import styles from './LoadScreen.module.scss'

type Props = {}

export default function LoadScreen({}: Props) {
  return (
    <div className={styles.loading}>Loading...</div>
  )
}