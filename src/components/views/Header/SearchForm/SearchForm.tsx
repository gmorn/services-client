import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styles from './SearchForm.module.scss'
import Image from 'next/image'
import searchIcon from '@/assets/images/icons/search_icon.png'
import closeIcon from '@/assets/images/icons/close_icon.png'

type Props = {}

export default function SearchForm({}: Props) {

  type RefObject<T> = MutableRefObject<T | null>;



  const [formState, setFormState] = useState(false)
  const [border, setBorder] = useState(false)
  const [value, setValue] = useState('')

  const searchFormRef: RefObject<HTMLInputElement> = useRef(null);
  const searchIconRef: RefObject<HTMLImageElement> = useRef(null);



  useEffect(() => {

    if (!searchFormRef) return
    if (value) return

    const hendelClick = (e: MouseEvent) => {
        if (searchIconRef.current?.contains(e.target as Node)) return

        if (searchFormRef.current && !searchFormRef.current.contains(e.target as Node)) {
          setFormState(false)
        } 
    }

    document.addEventListener('mousedown', hendelClick)
    return () => {
        document.removeEventListener('mousedown', hendelClick)
    }
  })

  useEffect(() => visebleBorder(), [formState])

  const switchForm = () => {
    setFormState(!formState)
  }

  const visebleBorder = () => {
    if (formState) {
      setBorder(true)
    } else {
      setTimeout(() => {
        setBorder(false)
      }, 350);
    }
  }

  const clearForm = () => {
    setValue('')
  }

  return (
    <label htmlFor="YOURID" className={`
      ${styles.searchForm} 
      ${formState ? styles.active : ''}
      ${border ? styles.border : ''}
    `}>
      <input 
        id="YOURID"
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        ref={searchFormRef}
      />
      {!value 
      ?
        <div className={styles.imgBlock}>
          <Image
            src={searchIcon}
            alt=""
            width={24}
            height={24}
            onClick={switchForm}
            ref={searchIconRef}
          />
        </div>
      :
        <div className={styles.imgBlock}>
          <Image
            src={closeIcon}
            alt=""
            width={16}
            height={16}
            onClick={clearForm}
            ref={searchIconRef}
          />
        </div>
      }


    </label>
  )
}