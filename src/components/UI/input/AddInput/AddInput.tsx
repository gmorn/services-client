import React, { ChangeEvent } from 'react'
import styles from './AddInput.module.scss'

type Props = {
  placeholder: string
  value?: string;
  onChange?: (str: string) => void;
  label?: string;
  status?: boolean | null;
}

export default function AddInput({ placeholder, value, onChange, status, label }: Props) {
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
}

  return (
    <div className={styles.inputBlock}>
      <input
        className={`
          ${styles.input}
          ${status !== null && 
            (status ? 
              styles.verificationFailed : 
              styles.verificationPassed
            )
          }
        `}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <label className={status !== null ? 
        (status ? styles.active : '') : ''}
      >{label}</label>
    </div>
  )
}