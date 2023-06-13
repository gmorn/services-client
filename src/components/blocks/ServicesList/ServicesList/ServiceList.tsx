import { T_servise } from '@/pages/service/service.type'
import React from 'react'
import ServiceItem from '../ServicesItem/ServiceItem'

type Props = {
  items: T_servise[] | never[]
  format: boolean
  reset: ( id: number ) => void
}

export default function ServiceList({ items, format, reset }: Props) {
  return (
    <>
      {
        items.map(item => (
          <ServiceItem 
            key={item.id} 
            item={item} 
            format={format}
            reset={reset}  
          />
        ))
      }
    </>
  )
}