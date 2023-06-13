import React, { useEffect, useState } from 'react'
import styles from './EditDate.module.scss'
import Title from '@/components/UI/title/Title'
import TimeList from './TimeLIst/TimeList'

type Props = {}

export default function EditDate({}: Props) {

    const [ week, setWeek ] = useState<number[]>([])

    const [ switcherState, setSwitcherState ] = useState<boolean>(false)

    function sortArray(arr: number[]): number[] {
        return arr.sort((a, b) => a - b);
    }
    const getDayForWeek = (dayNumber: number) => {
        const updatedWeek = [...week]; // Создаем копию массива week
      
        const existingIndex = updatedWeek.indexOf(dayNumber);
        if (existingIndex !== -1) {
          // Число уже существует в массиве, удаляем его
          updatedWeek.splice(existingIndex, 1);
        } else {
          // Число не существует в массиве, добавляем его
          updatedWeek.push(dayNumber);
        }
      
        const sortedWeek = sortArray(updatedWeek); // Сортируем массив с помощью функции sortArray
      
        setWeek(sortedWeek); // Обновляем состояние week с отсортированным массивом
      }

      const checkNumberInWeek = (number: number): boolean => {
        return week.includes(number);
      }

      const weekList: string[] = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
      ]

    useEffect(() => {console.log(week)}, [week])

    return (
        <div>
            <Title>Выберите дни недели</Title>
            <div className={styles.daysBlock}>
                {
                    weekList.map(( item, index ) => (
                        <div className={`${styles.dayBlock}
                        ${checkNumberInWeek(index) ? 
                            styles.active :
                            ''
                        }
                    `}
                    key={index}

                    onClick={() => getDayForWeek(index)}
                >
                    {item}
                </div>
                ))}
            </div>
            <div className={styles.editDaysBlock}>
                <Title>Выберите время</Title>
                <div className={styles.switcher}>
                    <div 
                        className={`${styles.button}
                            ${switcherState ? 
                                styles.active :''}
                        `}
                        onClick={() => setSwitcherState(true)}
                    >
                        Для всех дней сразу
                    </div>
                    <div 
                        className={`${styles.button}
                            ${switcherState ? '' :
                                styles.active}
                        `}
                        onClick={() => setSwitcherState(false)}   
                    >
                        Для каждого дня отдельно
                    </div>
                </div>
                <div className={styles.dayTimeEdit}>
                    <div className={`${styles.allDays}
                            ${switcherState ? 
                                styles.active :''} 
                        `}
                    >
                        hello
                    </div>
                    <div className={`${styles.specificDays}
                            ${switcherState ? '' :
                                styles.active}  
                        `}
                    >
                        <div className={styles.timeDaysBlock}>
                            {
                                weekList.map(( item, index ) => (
                                    <div className={`${styles.timeDayBlock}
                                            ${checkNumberInWeek(index) ? 
                                                styles.active :
                                                ''
                                            }
                                        `}
                                        key={index}
                                    >
                                        <h2>{item}</h2>
                                        <div className={styles.tileList}>
                                            <TimeList/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}