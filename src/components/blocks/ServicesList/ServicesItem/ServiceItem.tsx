import { T_servise } from '@/pages/service/service.type'
import React, { useEffect, useState } from 'react'
import styles from './ServiceItem.module.scss'
import OrgService from '@/services/api/orgServices'
import { T_Organization } from '@/pages/organization/organization.types'
import Link from 'next/link'
import { useAppSelector } from '@/hooks/store'
import closeIcon from '@/assets/images/icons/close_icon.png'
import Image from 'next/image'
import ServiceService from '@/services/api/serviceServices'

type Props = {
    item: T_servise
    format: boolean
    reset: ( id: number ) => void
}

export default function ServiceItem({ item, format, reset }: Props) {

    const [ Org, setOrg ] = useState<T_Organization | any>({})

    const [ url, setUrl ] = useState(`/organization/${Org.id}`)

    const getOrgName = async ( id: number ) => {
        const response = await OrgService.getOrgById( id )
        return response.data
    }

    // const user = useAppSelector( state => state.user.user.userData )
    
    useEffect(() => {
        setUrl(`/organization/${Org.id}`)
    }, [Org])


    useEffect(() => {
        const fetchOrg = async () => {
            const org = await getOrgName(item.organization_id);
            setOrg(org);
        };
    
        fetchOrg();
    }, [item]);

    const deleteService = async ( id: number ) => {
        await ServiceService.deleteService( id )
        reset( item.organization_id )
    }

    return (
        <div className={styles.cartBlock}>
            <div className={styles.deleteButton}>
                <Image
                    src={closeIcon}
                    alt=""
                    width={17}
                    height={17}
                    onClick={() => deleteService( item.id )}
                />
            </div>
            <Link href={`/service/${item.id}`}>
                <div className={`${styles.cart}
                ${format ? styles.one : styles.two}`}>
                    <div className={styles.logo}>
                        {
                            item.cart_logo === null ?
                                <div className={styles.plug}>
                                    <p>Картинка<br/> отсутствует</p>
                                </div>
                            : 
                                <div className={styles.content}>
                                    <img src={item.cart_logo} />
                                </div>
                        }
                    </div>
                    <div className={styles.name}>
                        {
                            item.cart_logo === null ?
                                <div className={styles.plug}>
                                    <p>услуга не имеет имени</p>
                                </div>
                            : 
                                <div className={styles.content}>
                                    {item.name}
                                </div>
                        }
                    </div>
                    <div className={styles.price}>
                        {
                            item.cart_logo === null ?
                                <div className={styles.plug}>
                                    <p>Цена не указана</p>
                                </div>
                            : 
                                <div className={styles.content}>
                                    {item.price}$
                                </div>
                        }
                    </div>
                    <Link href={`/organization/${Org.id}`}>
                        <div className={styles.orgName}>
                            {Org.name}
                        </div>
                    </Link>
                </div>
            </Link>
        </div>
    )
}