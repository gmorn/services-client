import ServiceService from '@/services/api/serviceServices';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { T_servise } from './service.type';
import HeaderImage from '@/components/blocks/HeaderImage/HeaderImage';
import styles from './service.module.scss'
import Description from '@/components/blocks/Description/Description';
import OrgService from '@/services/api/orgServices';
import { T_Organization } from '../organization/organization.types';
import Link from 'next/link';
import Calendar from '@/components/views/serviceViews/Calendar/Calendar';
import EditDate from '@/components/views/serviceViews/EditDate/EditDate';

type Props = {};

export default function ServiceSubPage({}: Props) {
  const [pageType, setPageType] = useState<number>(0);
  const [pageStatus, setpagestatus] = useState<boolean>(false);
  const [service, setService] = useState<T_servise | undefined>();

  const router = useRouter();

  useEffect(() => {
    if (router.query.id !== undefined) {
      setPageType(Number(router.query.id as string));
    }
  }, [router.query.id, router]);
    
  const fetchService = async (id: number) => {
    const getService = async (id: number) => {
      const response = await ServiceService.getServiceById(id);
      return response.data;
    };
    const service = await getService(id);
    setService(service);
  };
  
  useEffect(() => {
    fetchService(pageType);
  }, [pageType]);

  useEffect(() => {
    fetchService(pageType);
  }, [service])

  const getOrgName = async ( id: number ) => {
    const response = await OrgService.getOrgById( id )
    return response.data
  }

  const [ Org, setOrg ] = useState<T_Organization | any>({})

  const [ url, setUrl ] = useState(`/organization/${Org.id}`)
    


  useEffect(() => {
    const fetchOrg = async () => {
      if (service) {
        const org = await getOrgName(service.organization_id);
        setOrg(org);
      }
    };
  
    fetchOrg();
  }, [service]);

  return (
    <>
      {service && 
      <div>
        <HeaderImage 
          img={service.page_logo} 
          id={service.id}
          reload={fetchService}
          newHeaderFunc={ServiceService.newHeader}
        />
        <div className='wrapper'>
          <div className={styles.flex}>
            <div className={styles.desc}>
              <Description
                description={service.description}
                id={service.id}
                reload={fetchService}
                newDescFunc={ServiceService.newDescription}
              />
            </div>
            <div className={styles.serviceCart}>
            <div className={`${styles.cart}`}>
                    <div className={styles.logo}>
                        {
                            service.cart_logo === null ?
                                <div className={styles.plug}>
                                    <p>Картинка<br/> отсутствует</p>
                                </div>
                            : 
                                <div className={styles.content}>
                                    <img src={service.cart_logo} />
                                </div>
                        }
                    </div>
                    <div className={styles.name}>
                        {
                            service.cart_logo === null ?
                                <div className={styles.plug}>
                                    <p>услуга не имеет имени</p>
                                </div>
                            : 
                                <div className={styles.content}>
                                    {service.name}
                                </div>
                        }
                    </div>
                    <div className={styles.price}>
                        {
                            service.cart_logo === null ?
                                <div className={styles.plug}>
                                    <p>Цена не указана</p>
                                </div>
                            : 
                                <div className={styles.content}>
                                    {service.price}$
                                </div>
                        }
                    </div>
                    <Link href={`/organization/${service.organization_id}`}>
                        <div className={styles.orgName}>
                            {Org.name}
                        </div>
                    </Link>
                </div>
            </div>
          </div>
          <div className={styles.editDateBlock}>
            <EditDate/>
          </div>
          <div>
            <Calendar/>
          </div>
        </div>
      </div>}
    </>
  );
}