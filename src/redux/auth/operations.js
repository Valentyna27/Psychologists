import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../../firebase/firebase';
import { ref, set, get, child } from 'firebase/database';
import { setUser, clearUser } from './slice';

const dbRef = ref(db);

// Registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, displayName = '' }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const profile = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || email.split('@')[0],
        photoURL: user.photoURL || '',
        createdAt: Date.now(),
      };

      await set(ref(db, 'users/' + user.uid), profile);

      return profile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const snapshot = await get(child(dbRef, `users/${user.uid}`));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        const fallback = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || email.split('@')[0],
          photoURL: user.photoURL || '',
        };
        await set(ref(db, 'users/' + user.uid), fallback);
        return fallback;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

// Refresh user
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { dispatch }) => {
    return new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(async user => {
        if (user) {
          const snapshot = await get(child(ref(db), `users/${user.uid}`));
          if (snapshot.exists()) {
            dispatch(setUser(snapshot.val()));
          } else {
            dispatch(clearUser());
          }
        } else {
          dispatch(clearUser());
        }
        resolve();
        unsubscribe();
      });
    });
  }
);
