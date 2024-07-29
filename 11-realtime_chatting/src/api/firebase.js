import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDdJ_ttMXZG6VvMQHvgDfiiJDdorqitnGc',
  authDomain: 'realtime-chatting-78ada.firebaseapp.com',
  projectId: 'realtime-chatting-78ada',
  storageBucket: 'realtime-chatting-78ada.appspot.com',
  messagingSenderId: '934972727949',
  appId: '1:934972727949:web:cf839e8040d9382f3778c4',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

export { getUserAuth };
