import React, { useEffect, useState, MutableRefObject, useRef } from 'react'
import styles from './UserNav.module.scss'
import MainButton from '@/components/UI/button/mainButton/MainButton'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import Link from 'next/link'
import { SwitchRole, out, userOrg } from '@/store/user/userSlice'
import DropDaunMenu from '@/components/UI/dropDownMenu/DropDaunMenu'
import Modal from '@/components/UI/modal/Modal'
import { useRouter } from 'next/router'
import AddInput from '@/components/UI/input/AddInput/AddInput'
import OrgService from '@/services/api/orgServices'
import { T_NewRole } from '@/services/api/userServices.types'

type Props = {}

export default function UserNav({}: Props) {

  const user = useAppSelector(state => state.user.user)

  const [modal, setModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  
  const [menuState, setMenuState] = useState<boolean>(false)

  const router = useRouter();

  type RefObject<T> = MutableRefObject<T | null>;
  
  const menuRef: RefObject<HTMLInputElement> = useRef(null);
  const menuLinkRef: RefObject<HTMLImageElement> = useRef(null);

  useEffect(() => {

    if (!menuRef) return

    const hendelClick = (e: MouseEvent) => {
      if (menuLinkRef.current?.contains(e.target as Node)) return

      if (menuRef.current && !menuRef.current.contains(e.target as Node) ) {
        setMenuState(false)
      } 
    }

    document.addEventListener('mousedown', hendelClick)
    return () => {
        document.removeEventListener('mousedown', hendelClick)
    }
  })

  useEffect(() => {
    setMenuState(false)
  }, [modal, router.asPath])




  const [orgState, setOrgState] = useState<boolean>(false)
  const [newOrgName, setNewOrgName] = useState<string>('')
  const [message, setMessage] = useState<boolean>(false)


  const createOrg = async() => {
    try {
      const { data } = await OrgService.createOrg({
        name: newOrgName,
        user_id: user.userData.id,
      })
      dispatch(userOrg(data))
      const newRole: T_NewRole = {
        role: 'owner',
        id: user.userData.id
      }
      dispatch(SwitchRole(newRole))
      setMessage(true)
    } catch (error: any) {
      const statusCode = error.response?.status;
      if (statusCode === 400) {
        setOrgState(true)
      } else {
          console.error(error);
      }
    }
  }

useEffect(() => {setOrgState(false)}, [newOrgName])

  return(
    <div>
      {
        user.isLogin
        ?
          <div className={styles.userNav} >
            <div 
              className={styles.user} 
              onClick={() => setMenuState(!menuState)}
              ref={menuRef}
            >
              <p>{user.userData.firstName}</p>
              <div className={`${styles.userLogo} ${
                user.userData.role === 'user' ? styles.user :
                user.userData.role === 'admin' ? styles.admin : 
                user.userData.role === 'owner' ? styles.owner :
                user.userData.role === 'menage' ? styles.menage :
                user.userData.role === 'employee' ? styles.employee : ''
              }`}>
                <img src={user.userData.logo} alt="" />
              </div>

            </div>
            <div className={styles.menu} ref={menuLinkRef}>
              <DropDaunMenu state={menuState}>
                
                  <p><Link href='/'>Профиль</Link></p>
                

                {
                  user.userData.role === 'user' ? 
                    <p onClick={() => {setModal(true)}}>Создать организацию</p> :
                  user.userData.role === 'admin' ? <p>Админ панель</p> : 
                  user.userData.role === 'owner' || 'menage' || 'employee' ? 
                    <Link href={`/organization/${user.userData.userOrgId}`}>
                      <p>Перейти к организации</p>
                    </Link> 
                  : ''
                }
                <Link href='/'>
                  <p 
                    onClick={() => dispatch(out())} 
                    className={styles.red}
                  >
                    Выйти
                  </p>
                </Link>
              </DropDaunMenu>
            </div>
            <Modal modal={modal} setModal={setModal}>
              {
                message ? 
                  <div className={styles.message}>
                    <h2>Организация создана!</h2>
                      <Link href={`/organization/${user.userData.userOrgId}`}>
                      <MainButton onClick={() => setModal(false)}>Перейти к организации</MainButton> 
                    </Link> 
                  </div>
                : 
                  <div className={styles.modalContent}>
                    <AddInput
                      status={orgState}
                      onChange={setNewOrgName}
                      value={newOrgName}
                      label={'Название уже занято'}
                      placeholder={'Введите название организации'}
                      />
                    <MainButton 
                      disabled={
                        newOrgName === '' ? 
                        true : false
                      }
                      onClick={createOrg}
                      >Сохранить</MainButton>
                  </div>
              }
            </Modal>
          </div>
        :
          <Link href="/authorize">
            <MainButton>Войти</MainButton> 
          </Link> 
      }
      
    </div>
  )
}