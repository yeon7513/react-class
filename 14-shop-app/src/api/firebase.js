import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8Wq1wiK7nma--7EYpVy6X5iW_qsJC_rk',
  authDomain: 'mbti-project-495d0.firebaseapp.com',
  projectId: 'mbti-project-495d0',
  storageBucket: 'mbti-project-495d0.appspot.com',
  messagingSenderId: '164107306646',
  appId: '1:164107306646:web:1e7b5155487b84aaa624b7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function getUserAuth() {
  return auth;
}

function getCollection(...path) {
  let newPath = path;
  if (typeof path[0] !== 'string') {
    // [newPath] = path;
    newPath = path.flat();
  }
  return collection(db, ...newPath);
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, 'desc'),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) {
    return 0;
  }
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
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
  const resultData = docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

async function getData(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);

  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  const resultData = { ...doc.data(), docId: doc.id };

  return resultData;
}

async function joinUser(uid, email) {
  await setDoc(doc(db, 'users', uid), { email: email });
}

async function asyncCart(uid, cartArr) {
  // 하위 컬렉션에 접근하는 방법
  // const cartRef = collection(db, 'users', uid, 'cart');
  const cartRef = getCollection('users', uid, 'cart');
  // batch : 여러 개의 작업을 한번에 몰아서 해줌. (일괄작업)
  const batch = writeBatch(db);

  for (const item of cartArr) {
    const result = await updateQuantity(uid, item);

    if (!result) {
      const itemRef = doc(cartRef, item.id.toString());
      // batch.set() :
      batch.set(itemRef, item);
    }
  }

  // batch.commit() :
  await batch.commit();
}

async function updateQuantity(uid, cartItem) {
  const cartRef = getCollection('users', uid, 'cart');
  const itemRef = doc(cartRef, cartItem.id.toString());

  // 문서가 존재하는지 확인
  const itemDoc = await getDoc(itemRef);
  if (itemDoc.exists()) {
    // 문서가 존재할 경우
    const currentData = itemDoc.data();
    const updatedQuantity = (currentData.quantity || 0) + 1;
    await updateDoc(itemRef, { quantity: updatedQuantity });
    return true;
  } else {
    // 문서가 존재하지 않을 경우
    return false;
  }
}

async function addCart(collectionName, cartObj) {
  const collectionRef = getCollection(collectionName);
  const cartRef = doc(collectionRef, cartObj.id.toString());
  await setDoc(cartRef, cartObj);
}

async function deleteDatas(collectionName, docId) {
  try {
    const cartRef = getCollection(collectionName);
    const docRef = doc(cartRef, docId.toString());
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log(error);
  }
}

export {
  addCart,
  asyncCart,
  deleteDatas,
  getData,
  getDatas,
  getUserAuth,
  joinUser,
  updateQuantity,
};
