import React from 'react'
import styles from './ServiceListSwitcher.module.scss'
import rectangle from '@/assets/images/icons/rectangle.png'
import square from '@/assets/images/icons/square.png'
import Image from 'next/image'

type Props = {
    format: boolean
    func: ( value: boolean ) => void
}

export default function ServiseListSwitcher({ format, func }: Props) {
  return (
    <div className={`${styles.switcher}
    ${format ? styles.one : styles.two}`}>
      <Image
        src={square}
        alt=""
        width={31}
        height={31}
        onClick={() => func( true )}
      />
      <Image
        src={rectangle}
        alt=""
        width={31}
        height={31}
        onClick={() => func( false )}
      />
    </div>
  )
}