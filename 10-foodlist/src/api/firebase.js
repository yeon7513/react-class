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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD_2jeQIqqXZ4Gn32qAmjz07qx2Z8FdIuI',
  authDomain: 'foodlist-ac2aa.firebaseapp.com',
  projectId: 'foodlist-ac2aa',
  storageBucket: 'foodlist-ac2aa.appspot.com',
  messagingSenderId: '35412747784',
  appId: '1:35412747784:web:1bd8834619bd451ef513bd',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function getAllDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

async function getDatasByOrderLimit(collectionName, options) {
  let q;

  if (options.lq) {
    q = query(
      getCollection(collectionName),
      orderBy(options.order, 'desc'),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(
      getCollection(collectionName),
      orderBy(options.order, 'desc'),
      limit(options.limit)
    );
  }

  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];

  const resultData = docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return { lastQuery, resultData };
}

// 이미지 업로드
async function uploadImg(path, imgFile) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

// 가장 마지막 아이디 추출
async function getLastId(collectionName, field) {
  const q = query(
    getCollection(collectionName),
    orderBy(field, 'desc'),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];

  return lastId;
}

// 데이터 추가
async function addDatas(collectionName, dataObj) {
  const path = createPath('foods/');
  const url = await uploadImg(path, dataObj.imgUrl);
  dataObj.imgUrl = url;

  const lastId = (await getLastId(collectionName, 'id')) + 1;
  dataObj.id = lastId;

  const time = new Date().getTime();
  dataObj.createdAt = time;
  dataObj.updatedAt = time;

  const result = await addDoc(getCollection(collectionName), dataObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };

  return resultData;
}

// 데이터 수정
async function updateDatas(collectionName, updateObj, docId, imgUrl) {
  const docRef = await doc(db, collectionName, docId);

  const time = new Date().getTime();
  updateObj.updatedAt = time;

  if (updateObj.imgUrl === null) {
    delete updateObj['imgUrl'];
  } else {
    const storage = getStorage();
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    const url = await uploadImg(createPath('foods/'), updateObj.imgUrl);
    updateObj.imgUrl = url;
  }

  await updateDoc(docRef, updateObj);
  const updatedData = await getDoc(docRef);
  const resultData = { docId: updatedData.id, ...updatedData.data() };

  return resultData;
}

// 데이터 삭제
async function deleteDatas(collectionName, docId, imgUrl) {
  const storage = getStorage();

  try {
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export {
  addDatas,
  deleteDatas,
  getAllDatas,
  getDatasByOrderLimit,
  updateDatas,
};
