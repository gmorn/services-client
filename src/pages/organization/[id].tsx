import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from './organization.module.scss'
import { T_Organization } from './organization.types'
import OrgService from '@/services/api/orgServices'
import HeaderImage from '@/components/blocks/HeaderImage/HeaderImage'
import Description from '@/components/blocks/Description/Description'
import OrgButtonBlock from '@/components/views/organizationViews/buttonBlock/OrgButtonBlock'
import AddServiceItem from '@/components/blocks/ServicesList/AddServiceItem/AddServiceItem'
import ServicesBlock from '@/components/views/organizationViews/servicesBlock/ServicesBlock'

type Props = {}

export default function organizationPage({}: Props) {

    const [orgId, setOrgId] = useState<number | null>(null)

    const router = useRouter()

    useEffect(() => {
        if (router.query.id !== undefined) {
            setOrgId(Number(router.query.id as string))
        }
        
        
    }, [router]);

    useEffect(() => {
        if (router.query.id !== undefined) {
            setOrgId(Number(router.query.id as string))
        }
    }, []);

    useEffect(() => {getOrg()}, [orgId])

    const [organization, setOrganization] = useState<T_Organization>({
        id: null,
        name: '',
        header: null,
        description: null,
    })

    const getOrg = async () => {
        if (orgId !== null) {
            const response = await OrgService.getOrgById(orgId)
            setOrganization(response.data)
        }
    }





    return (
        <div className={styles.orgPage}>
            <div className={styles.header}>
                <HeaderImage 
                    img={organization.header} 
                    id={orgId}
                    reload={getOrg}
                    newHeaderFunc={OrgService.newHeader}
                />
            </div>
            <div className='wrapper'>
                <div className={styles.flex}>
                    <div className={styles.desc}>
                        <Description
                            description={organization.description}
                            id={orgId}
                            reload={getOrg}
                            newDescFunc={OrgService.newDescription}
                        />
                    </div>
                    <div className={styles.buttonBlock}>
                        <OrgButtonBlock/>
                    </div>
                </div>
                <div className={styles.services}>
                    <ServicesBlock id={orgId}/>
                </div>
                <div className={styles.news}>

                </div>
                <div className={styles.comment}>

                </div>
            </div>
        </div>
    )
}