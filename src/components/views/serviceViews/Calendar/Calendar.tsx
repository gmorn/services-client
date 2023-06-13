import React, { useState } from 'react';
import styles from './Calendar.module.scss';

type Props = {};

export default function Calendar({}: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (month) => {
    const monthNames = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];
    return monthNames[month];
  };

  const getDayOfWeek = (year, month, day) => {
    const date = new Date(year, month, day);
    let dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
      dayOfWeek = 6; // Переносим воскресенье в конец недели
    } else {
      dayOfWeek -= 1; // Сдвигаем остальные дни на одну позицию назад
    }
    return dayOfWeek;
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayOfWeek = getDayOfWeek(year, month, day);
    const fullDate = new Date(year, month, day);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(fullDate);
    console.log(`${dayOfWeek}, ${formattedDate}`);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const monthName = getMonthName(month);

    // Сдвигаем дни недели на одну позицию вперед
    const shiftedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    const calendarDays = [];

    // Добавляем пустые ячейки для сдвига
    for (let i = 0; i < shiftedFirstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className={styles['calendar-day empty']} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <div key={day} className={styles['calendar-day']} onClick={() => handleDateClick(day)}>
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles['calendar-header']}>
        <button onClick={handlePrevMonth}>Пред</button>
        <h2>{getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}</h2>
        <button onClick={handleNextMonth}>След</button>
      </div>
      <div className={styles['calendar-grid']}>{renderCalendar()}</div>
    </div>
  );
};
