import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, clearUser } from './auth/slice';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/firebase';
import psychologistsReducer from './psychologist/slice';
import filtersReducer from './filters/slice';
import favoritesReducer from './favorites/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    psychologists: psychologistsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

onAuthStateChanged(auth, async firebaseUser => {
  if (firebaseUser) {
    const snapshot = await get(ref(db, 'users/' + firebaseUser.uid));
    if (snapshot.exists()) {
      store.dispatch(setUser(snapshot.val()));
    } else {
      const minimal = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName:
          firebaseUser.displayName || firebaseUser.email.split('@')[0],
        photoURL: firebaseUser.photoURL || '',
      };
      store.dispatch(setUser(minimal));
    }
  } else {
    store.dispatch(clearUser());
  }
});
