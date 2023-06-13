import React, { useState } from 'react'
import styles from './ScheduleBlock.module.scss'
import Title from '@/components/UI/title/Title'

type Props = {}

export default function ScheduleBlock({}: Props) {

    const [week, setWeek] = useState([])

    return (
        <div className='wwrapper'>
            <div className={styles.editBlock}>
                <div className={styles.days}>
                    <Title>выберете день</Title>
                    <div className={styles.daysBLock}>

                    </div>
                </div>
                <div className={styles.time}>
                    <div className={styles.switcher}></div>
                </div>
                <div className={styles.time}>

                </div>
            </div>
            <div className={styles.scheduleBlock}>
                <div className={styles.title}>

                </div>

                Ё
            </div>
        </div>
    )
}