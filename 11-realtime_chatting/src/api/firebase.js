import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

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

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}

async function getDatas(collectionName, setData) {
  const q = query(
    getCollection(collectionName),
    orderBy('createdAt'),
    limit(100)
  );

  // onSnapshot : 데이터에 변동 사항이 있는지 실시간으로 감시 하면서
  // 바뀐 데이터가 있다면, 그 바뀐 데이터를 불러온다. (옵저버 역할)

  // ** 사용법
  // => onSnapshot('감시할 데이터(쿼리)', 실행할 함수)

  // ** getDocs와의 차이점?
  // => getDocs는 처음 한 번만 불러오지만, onSnapshot은 해당 컬렉션(현재 감시중인 데이터)의 변경 사항을 실시간으로 감시하고 변경된 데이터를 업데이트한다.

  // 즉!!
  // getDocs : 단발성 데이터 읽기
  // onSnapshot : 실시간 업데이트가 필요한 경우

  // 단, onSnapshot은 실시간으로 계속 켜져있는 상태이므로 서버에 부담을 줄 수 있다.
  // 그래서 꼭 클린업 함수로 지워줘야함!!

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    setData(data);
  });

  return unsubscribe;
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

export { addDatas, db, getDatas, getQuery, getUserAuth };
