import React, { FC, useEffect } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { reloadUser, userOrg } from '@/store/user/userSlice'
import OrgService from '@/services/api/orgServices'

type Props = {
    children: React.ReactNode
}

const Layout: FC<Props> = ({children}) => {

  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.user.user.userData)


  useEffect(() => {
    localStorage.getItem('user') && dispatch(reloadUser())
  }, [])

  useEffect(() => {

    const getOrgId = async () => {
      if (user.role !== 'user' || 'admin') {
        if (user.id !== null){
          const response = await OrgService.getOrgByUserId(user.id)
          dispatch(userOrg(response.data))
        }
        
      }
    }
    getOrgId()
  }, [user])

  return (
    <div>
        <Header/>
          {children}
        <Footer/>
    </div>
  )
}

export default Layout