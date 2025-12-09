import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPsychologists } from '../../redux/psychologist/slice';
import PsychologistsPageWrapper from '../../components/PageWrapper/PageWrapper';
import {
  selectAllPsychologists,
  selectPsychologistsLoading,
  selectPsychologistsError,
} from '../../redux/psychologist/selectors';
import { selectFilter } from '../../redux/filters/selectors';

export default function Psychologists() {
  const dispatch = useDispatch();
  const items = useSelector(selectAllPsychologists);
  const loading = useSelector(selectPsychologistsLoading);
  const error = useSelector(selectPsychologistsError);
  const sortType = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  return (
    <PsychologistsPageWrapper
      items={items}
      loading={loading}
      error={error}
      sortType={sortType}
    />
  );
}
