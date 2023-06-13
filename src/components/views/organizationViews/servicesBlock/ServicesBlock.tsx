import AddServiceItem from '@/components/blocks/ServicesList/AddServiceItem/AddServiceItem'
import { T_servise } from '@/pages/service/service.type'
import ServiceService from '@/services/api/serviceServices'
import React, { useEffect, useState } from 'react'
import styles from './ServicesBlock.module.scss'
import Title from '@/components/UI/title/Title'
import ServiceListSwitcher from '@/components/UI/switcher/ServiceListSwitcher'
import ServiceList from '@/components/blocks/ServicesList/ServicesList/ServiceList'

type Props = {
    // services: T_servise[]
    id: number | null
}



export default function ServicesBlock({ id }: Props) {

  const [ services, setServices ] = useState<T_servise[] | never[]>([])

  const [format, setFormat] = useState(true)

  const getService = async ( id: number ) => {
    const response = await ServiceService.getServicesByOrgId( id )
    setServices(response.data)
  }

  const switchFormat = ( value: boolean ) => {
    setFormat(value)
  }

  useEffect(() => {
    if (id !== null) {
      getService(id)
    }
  }, [id])

  return (
    <div className={styles.serviceBlock}>
        <div className={styles.serviceNav}>
          <Title>Услуги</Title>
          <ServiceListSwitcher format={format} func={switchFormat}/>
        </div>
        <div className={`${styles.servicesList} 
          ${format ? styles.one : styles.two}`}
        >
          <AddServiceItem format={format} id={id} getService={getService}/>
          <ServiceList items={services} format={format} reset={getService}/>
        </div>
    </div>
  )
}