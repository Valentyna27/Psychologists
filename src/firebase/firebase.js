import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDExvLGJTx-JKY_DKdN_96uSdRm6nPXlM4',
  authDomain: 'phychologists-168b2.firebaseapp.com',
  databaseURL: 'https://phychologists-168b2-default-rtdb.firebaseio.com/',
  projectId: 'phychologists-168b2',
  storageBucket: 'phychologists-168b2.firebasestorage.app',
  messagingSenderId: '254628875422',
  appId: '1:254628875422:web:81a711f16946baf81e7f8f',
  measurementId: 'G-4ZSSVJXCL7',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
