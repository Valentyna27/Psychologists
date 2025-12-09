import { useState } from 'react';
import css from './TimeModal.module.css';

const time = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

export default function TimeDropdown({ onSelect }) {
  const [selectedTime, setSelectedTime] = useState('');

  const handleClick = time => {
    setSelectedTime(time);
    onSelect(time);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.dropdown}>
        <p className={css.title}>Meeting time</p>
        <ul className={css.list}>
          {time.map(time => (
            <li
              key={time}
              className={`${css.timeItem} ${
                selectedTime === time ? css.active : ''
              }`}
              onClick={() => handleClick(time)}
            >
              {time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
