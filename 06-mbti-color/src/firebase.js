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

async function getAllDatas(collectionName, order) {
  // debugger;
  const collect = await collection(db, collectionName);
  const q = query(collect, orderBy(order, 'desc'));
  const querySnapshot = await getDocs(q);
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return resultData;
}

async function addDatas(collectionName, dataObj) {
  try {
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    const lastId = await getLastNum(collectionName, 'id');
    dataObj.id = lastId + 1;

    const collect = await collection(db, collectionName);
    const result = await addDoc(collect, dataObj);

    const docSnap = await getDoc(result);

    const resultData = { ...docSnap.data(), docId: docSnap.id };

    return resultData;
  } catch (err) {
    console.log(err);
    return false;
  }
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

export { addDatas, deleteDatas, getAllDatas, updateDatas };
