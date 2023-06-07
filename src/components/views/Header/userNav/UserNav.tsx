import React from 'react'
import styles from './UserNav.module.scss'
import MainButton from '@/components/UI/button/mainButton/MainButton'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import Link from 'next/link'
import { out } from '@/store/user/userSlice'

type Props = {}



export default function UserNav({}: Props) {

  const user = useAppSelector(state => state.user.user)

  const dispatch = useAppDispatch()

  const outUser = () => {
    dispatch(out())
  }

  return (
    <div>
      {
        user.isLogin
        ?
          <>
          <MainButton onClick={outUser}>Выйти</MainButton>
          </>
        :
          <Link href="/authorize">
            <MainButton>Войти</MainButton> 
          </Link> 
      }
      
    </div>
  )
}