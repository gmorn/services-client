import React, { ChangeEvent } from 'react'
import styles from './FormInput.module.scss'

type Props = {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (str: string) => void;
    status: boolean | null;
}

export default function FormInput({ type, value, onChange, placeholder, status = null, label }: Props) {
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    }
    
    return (
        <div className={styles.inputBlock}>
            <input 
                className={`
                    ${styles.formInput} 
                    ${status !== null && 
                        (status ? 
                            styles.verificationPassed : 
                            styles.verificationFailed
                        )
                    }
                `}
                type={type !== undefined ? type : 'text'}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <label className={status !== null ? 
                (!status ? styles.active : '') : ''}
            >{label}</label>
        </div>
    )
}