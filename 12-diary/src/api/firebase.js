import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
  runTransaction,
  updateDoc,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDbGO50Ho1qEl4VHh79dM4hfm6Xs44l7dE',
  authDomain: 'my-diary-b768b.firebaseapp.com',
  projectId: 'my-diary-b768b',
  storageBucket: 'my-diary-b768b.appspot.com',
  messagingSenderId: '705016253635',
  appId: '1:705016253635:web:a5c04f9f494c1b515ca676',
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

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName),
    orderBy(field, 'desc'),
    limit(1)
  );

  const lastDoc = await getDocs(q);

  // 만약 마지막 아이디가 없다면? 0을 리턴
  if (lastDoc.docs.length === 0) {
    return 0;
  }

  const lastNum = lastDoc.docs[0].data()[field];

  return lastNum;
}

async function addDatas(collectionName, addObj) {
  try {
    // Transaction 함수
    // runTransaction(데이터베이스, 콜백함수)
    const resultData = await runTransaction(db, async () => {
      // 마지막 아이디를 뽑아온다.
      const lastId = (await getLastNum(collectionName, 'id')) + 1;
      addObj.id = lastId;

      const docRef = await addDoc(getCollection(collectionName), addObj);
      const snapshot = await getDoc(docRef);

      // exists() : 데이터의 존재 유무를 판단하는 함수 (boolean값을 반환)
      const docData = snapshot.exists()
        ? { ...snapshot.data(), docId: snapshot.id }
        : null;
      return docData;
    });

    return resultData;
  } catch (err) {
    console.log('Error Transaction: ', err);
  }
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orders = [], limits } = queryOption;

  const collect = getCollection(collectionName);
  let q = query(collect);

  // where 조건 (필드, 비교연산자, 비교할 값)
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건 (필드, 정렬기준)
  orders.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || 'asc'));
  });

  // limit 조건
  q = query(q, limit(limits));

  return q;
}

async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}

async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = await doc(db, collectionName, docId);
    await updateDoc(docRef, updateObj);

    const snapshot = await getDoc(docRef);
    const resultData = { docId: snapshot.id, ...snapshot.data() };

    return resultData;
  } catch (error) {
    console.log(error);
  }
}

async function deleteDatas(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log(error);
  }
}

export { addDatas, deleteDatas, getDatas, getUserAuth, updateDatas };
