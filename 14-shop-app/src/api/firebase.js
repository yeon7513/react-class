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

async function syncCart(uid, cartArr) {
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

async function updateTotalAndQuantity(uid, docId, operator) {
  const cartRef = getCollection('users', uid, 'cart');
  const itemRef = doc(cartRef, docId.toString());

  const itemDoc = await getDoc(itemRef);
  const itemData = itemDoc.data();

  let updatedQuantity;
  if (operator === 'increment') {
    updatedQuantity = itemData.quantity + 1;
  } else {
    updatedQuantity = itemData.quantity - 1;
  }
  const updatedTotal = itemData.price * updatedQuantity;

  const updateObj = {
    quantity: updatedQuantity,
    total: updatedTotal,
  };
  await updateDoc(itemRef, updateObj);
}

async function createOrder(uid, orderObj) {
  try {
    // 1. orders 컬렉션에 데이터 추가
    //   1.1 orderRef 객체 생성 ("users", uid, "orders")
    const ordersRef = getCollection('users', uid, 'orders');
    // 1.2 생성할 객체를 만들어준다.
    //   createObj = {cancelYn, createdAt, updatedAt, 기존 orderObj 프로퍼티들...}
    const createObj = {
      cancelYn: 'N',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      ...orderObj,
    };
    // 1.3 await addDoc
    const docRef = await addDoc(ordersRef, createObj);
    // 2. cart 문서 삭제
    //   2.1 batch 객체를 생성. writeBatch(db)
    const batch = writeBatch(db);
    // 2.2 orderObj.products.forEach 를 사용하여 삭제할 docRef 를 생성한다.
    const cartRef = getCollection('users', uid, 'cart');
    orderObj.products.forEach((product) => {
      // 2.3 batch.delete(docRef)
      const itemRef = doc(cartRef, product.id.toString());
      batch.delete(itemRef);
    });
    // 2.4 await batch.commit();
    await batch.commit();
    return docRef.id;
  } catch (error) {
    console.error(error);
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
  createOrder,
  deleteDatas,
  getData,
  getDatas,
  getUserAuth,
  joinUser,
  syncCart,
  updateQuantity,
  updateTotalAndQuantity,
};
