import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8Wq1wiK7nma--7EYpVy6X5iW_qsJC_rk',
  authDomain: 'mbti-project-495d0.firebaseapp.com',
  projectId: 'mbti-project-495d0',
  storageBucket: 'mbti-project-495d0.appspot.com',
  messagingSenderId: '164107306646',
  appId: '1:164107306646:web:1e7b5155487b84aaa624b7',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName, order, lq) {
  // debugger;
  const collect = await collection(db, collectionName);
  let q = query(collect, orderBy(order, 'desc'), limit(10));

  if (lq) {
    q = query(collect, orderBy(order, 'desc'), startAfter(lq), limit(10));
  }

  const querySnapshot = await getDocs(q);
  const lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return { resultData, lastQuery };
}

async function addDatas(collectionName, dataObj) {
  const collect = await collection(db, collectionName);
  const lastId = (await getLastNum(collectionName, 'id')) + 1;
  const time = new Date().getTime();

  dataObj.id = lastId;
  dataObj.createdAt = time;
  dataObj.updatedAt = time;

  const result = await addDoc(collect, dataObj);
  return result;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, 'desc'),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    return false;
  }
}

// 데이터 수정
async function updateDatas(collectionName, updateInfoObj, docId) {
  const docRef = await doc(db, collectionName, docId);

  const time = new Date().getTime();
  updateInfoObj.updatedAt = time;

  await updateDoc(docRef, updateInfoObj);
  const updatedData = await getDoc(docRef);
  const resultData = { docId: updatedData.id, ...updatedData.data() };

  return resultData;
}

export { addDatas, deleteDatas, getDatas, updateDatas };
