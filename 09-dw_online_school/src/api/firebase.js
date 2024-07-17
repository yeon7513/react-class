import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyALde4FL5muDd2cNomJtXLHjrGv9SG-kFc',
  authDomain: 'dwos-cfe24.firebaseapp.com',
  projectId: 'dwos-cfe24',
  storageBucket: 'dwos-cfe24.appspot.com',
  messagingSenderId: '397358160537',
  appId: '1:397358160537:web:6e3ee618f5ce9c814eb608',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const result = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return result;
}

export { getDatas };
