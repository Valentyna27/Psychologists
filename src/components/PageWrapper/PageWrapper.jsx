import { useState, useMemo, useEffect } from 'react';
import Filters from '../Filters/Filters';
import PsychologistList from '../PsychologistsList/PsychologistsList';
import Loader from '../Loader/Loader';
import icon from '../../../public/icons/icons.svg';
import css from './PageWrapper.module.css';

export default function PsychologistsPageWrapper({
  items,
  sortType,
  loading,
  error,
}) {
  const [page, setPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [sortType]);

  const sortedItems = useMemo(() => {
    if (!items.length) return [];

    let result = [...items];

    if (sortType === 'price_low')
      result = result.filter(p => Number(p.price_per_hour) < 10);
    else if (sortType === 'price_high')
      result = result.filter(p => Number(p.price_per_hour) > 10);

    if (sortType === 'atoz')
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    else if (sortType === 'ztoa')
      result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));

    if (sortType === 'popular')
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    else if (sortType === 'notpopular')
      result.sort((a, b) => Number(a.rating) - Number(b.rating));

    return result;
  }, [items, sortType]);

  const totalPages = Math.ceil(sortedItems.length / pageSize);
  const slicedItems = sortedItems.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={css.wrapper}>
      <Filters />
      {sortedItems.length === 0 ? (
        <p className={css.noResults}>No psychologists match your filters.</p>
      ) : (
        <>
          <PsychologistList data={slicedItems} />
          {sortedItems.length > pageSize && (
            <div className={css.paginationBox}>
              <button
                className={css.backBtn}
                disabled={page === 1}
                onClick={() => setPage(prev => prev - 1)}
              >
                <svg className={css.backIcon} width={20} height={20}>
                  <use href={`${icon}#downArrow`} />
                </svg>
              </button>

              <p className={css.paginationText}>
                Page {page} of {totalPages}
              </p>

              <button
                className={css.forwardBtn}
                disabled={page === totalPages}
                onClick={() => setPage(prev => prev + 1)}
              >
                <svg className={css.forwardIcon} width={20} height={20}>
                  <use href={`${icon}#downArrow`} />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
