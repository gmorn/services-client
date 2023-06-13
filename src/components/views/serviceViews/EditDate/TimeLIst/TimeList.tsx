import React, { useState } from 'react'
import styles from './TimeList.module.scss'
import Modal from '@/components/UI/modal/Modal'
import AddInput from '@/components/UI/input/AddInput/AddInput'
import MainButton from '@/components/UI/button/mainButton/MainButton'

type Props = {
    getTimeList?: ([]) => void
}

export default function TimeList({ getTimeList }: Props) {

    const [ timeList, setTimeList ] = useState<string[]>([])

    const [ modal, setModal ] = useState<boolean>(false)

    const [ newTime, setNewTime ] = useState<string>('')

    const addTime = ( time: string ) => {
        const updatedList = [ ...timeList ]
        updatedList.push(time)
        setTimeList(updatedList)
        setNewTime('')
        setModal(false)
    }

    return (
        <div className={styles.timeListBlock}>
            <div 
                className={styles.addTime}
                onClick={() => setModal(true)}
            >
                <p>Добавить время</p>
            </div>
            {
                timeList.map((item, index) => (
                    <div className={styles.timeBlock}>
                        {item}
                    </div>
                ))
            }
            <Modal modal={modal} setModal={setModal}>
                <div className={styles.modalContent}>
                    <AddInput 
                        placeholder={'Введите время'}
                        value={newTime}
                        onChange={setNewTime}
                    />
                    <MainButton
                        disabled={
                            newTime === '' ? 
                            true : false
                        }
                        onClick={() => addTime(newTime)}
                    >Сохранить</MainButton>
                </div>
            </Modal>
        </div>
    )
}