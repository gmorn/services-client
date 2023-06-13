import MainButton from '@/components/UI/button/mainButton/MainButton'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function OrgButtonBlock({}: Props) {
  return (
    <div>
        <Link href='/employee-list'>
            <MainButton>Список сотрудников</MainButton>
        </Link>
    </div>
  )
}