import { getDatabase, ref, onValue } from 'firebase/database';

const db = getDatabase();

const psychologistsRef = ref(db, 'phychologists');

onValue(psychologistsRef, snapshot => {
  const data = snapshot.val();
  console.log(data);
});
