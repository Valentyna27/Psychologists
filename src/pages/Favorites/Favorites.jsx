import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import PsychologistsPageWrapper from '../../components/PageWrapper/PageWrapper';
import { fetchPsychologists } from '../../redux/psychologist/slice';
import {
  selectAllPsychologists,
  selectPsychologistsLoading,
  selectPsychologistsError,
} from '../../redux/psychologist/selectors';
import { selectFavorites } from '../../redux/favorites/selectors';
import { selectFilter } from '../../redux/filters/selectors';

export default function Favorites() {
  const dispatch = useDispatch();
  const items = useSelector(selectAllPsychologists);
  const favorites = useSelector(selectFavorites);
  const sortType = useSelector(selectFilter);
  const loading = useSelector(selectPsychologistsLoading);
  const error = useSelector(selectPsychologistsError);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPsychologists());
    }
  }, [dispatch, items.length]);

  const favoriteItems = useMemo(() => {
    return items.filter(p => favorites.includes(p.id));
  }, [items, favorites]);

  return (
    <PsychologistsPageWrapper
      items={favoriteItems}
      loading={loading}
      error={error}
      sortType={sortType}
    />
  );
}
