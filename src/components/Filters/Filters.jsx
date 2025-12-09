import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../../redux/filters/slice';
import { selectFilter } from '../../redux/filters/selectors';
import icon from '../../../public/icons/icons.svg';
import css from './Filters.module.css';

const options = [
  { label: 'A to Z', value: 'atoz' },
  { label: 'Z to A', value: 'ztoa' },
  { label: 'Less than 10$', value: 'price_low' },
  { label: 'Greater than 10$', value: 'price_high' },
  { label: 'Popular', value: 'popular' },
  { label: 'Not popular', value: 'notpopular' },
  { label: 'Show all', value: 'all' },
];

export default function Filters() {
  const dispatch = useDispatch();
  const sortFilter = useSelector(selectFilter);
  const [open, setOpen] = useState(false);

  const current = options.find(option => option.value === sortFilter)?.label;
  
  const handleSelect = value => {
    dispatch(setSortType(value));
    setOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <p className={css.title}>Filters</p>
      <button
        className={`${css.filterBtn} ${open ? css.opened : ''}`}
        onClick={() => setOpen(!open)}
      >
        <p className={css.selectedFilter}>{current}</p>
        <svg className={css.arrowIcon} width={20} height={20}>
          {' '}
          <use href={`${icon}#downArrow`}></use>
        </svg>{' '}
      </button>
      {open && (
        <div className={css.dropdown}>
          {options.map(option => (
            <div
              key={option.value}
              className={
                sortFilter === option.value
                  ? `${css.item} ${css.active}`
                  : css.item
              }
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
