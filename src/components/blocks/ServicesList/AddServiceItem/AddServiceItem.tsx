import React from 'react'
import styles from './AddServiseItem.module.scss'
import plusDefault from '@/assets/images/icons/plusDefault.png'
import plusActive from '@/assets/images/icons/plusActive.png'
import Image from 'next/image'
import ServiceService from '@/services/api/serviceServices'

type Props = {
  format: boolean
  id: number | null
  getService: (id: number) => void
}

export default function AddServiceItem({ format, id, getService }: Props) {

  const createService = async (id: number) => {
    await ServiceService.createService( id )
    getService(id)

    
  }
  
  return (
    <div 
      className={`${format ? 
        styles.cartBlockOne : 
        styles.cartBlockTwo}`}
      onClick={() => createService( id )}
    >
      <div className={styles.images}>
        <Image
          src={plusDefault}
          alt=""
          width={100}
          height={100}
        />
        <Image
          src={plusActive}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className={styles.title}>
        <p>Добавить услугу</p>
      </div>
    </div>
  )
}