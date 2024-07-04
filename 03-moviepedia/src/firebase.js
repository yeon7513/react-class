import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC1z_XaSFhGr94aEkaovWb_Sy8Vn4DKX5U',
  authDomain: 'moviepedia-3d829.firebaseapp.com',
  projectId: 'moviepedia-3d829',
  storageBucket: 'moviepedia-3d829.appspot.com',
  messagingSenderId: '593596953621',
  appId: '1:593596953621:web:183aac64b23588bb520a1c',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 불러오기
async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

// 데이터 불러온 후 정렬
async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  const q = query(collect, orderBy(options.order, 'desc'));
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

// 데이터 불러온 후 정렬 및 개수 제한
async function getDatasByOrderLimit(collectionName, options) {
  const collect = await collection(db, collectionName);

  let q;

  if (options.lq) {
    q = query(
      collect,
      orderBy(options.order, 'desc'),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, 'desc'), limit(options.limit));
  }

  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];

  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return { resultData, lastQuery };
}

// 데이터 추가
async function addDatas(collectionName, dataObj) {
  try {
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);
    return true;
  } catch (error) {
    return false;
  }
}

// 데이터 삭제
async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

// 데이터 수정
async function updateDatas(collectionName, docId, updateInfoObj) {
  const docRef = await doc(db, collectionName, docId);
  // const docData = await getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
}

export {
  addDatas,
  db,
  deleteDatas,
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
  updateDatas,
};
