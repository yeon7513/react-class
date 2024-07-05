import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// create
async function addDatas(collectionName, dataObj) {
  try {
    dataObj.createdAt = new Date().toLocaleString();

    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// read
async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  return snapshot;
}

// update
async function updateDatas(collectionName, docId, updateInfoObj) {
  const docRef = await doc(db, collectionName, docId);
  await updateDoc(docRef, updateInfoObj);
}

// delete
async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

export { addDatas, db, deleteDatas, getDatas, updateDatas };
