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
    // 이미지 파일명을 겹치지않게 UUID로 설정한다.
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;

    // 여기서 imgUrl은 input type='file' 안에 있는 File 객체이다.
    // 이 imgUrl은 uploadImage 함수 안에 들어가
    // 스토리지에 이미지를 저장 후 그 주소(문자열)를 return해 url변수에 저장한다.
    const url = await uploadImage(path, dataObj.imgUrl);

    // 그리고 최종적으로 데이터베이스에 저장할 imgUrl은 url이다.
    dataObj.imgUrl = url;

    // createdAt, updatedAt은 현재 날짜를 밀리세컨즈로 바꿔서 넣어줘야한다.
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    // id 필드의 값은 가장 큰 id에 +1을 해야한다.
    const lastId = await getLastNum(collectionName, 'id');
    dataObj.id = lastId + 1;

    // 파이어베이스 최종 저장
    const collect = await collection(db, collectionName);
    const result = await addDoc(collect, dataObj);
    // result에는 DocumentReference 이다. data() 사용 안됨.
    // data()를 사용하기 위해 getDoc을 쓰면 DocumentReference를 넣어 줄 수 있다.
    const docSnap = await getDoc(result);

    // 최종 데이터 객체 생성
    const resultData = { ...docSnap.data(), docId: docSnap.id };

    // 추가된 내용(resultData)이 추가되자마자 화면에 최종적으로 보여줘야 하기 때문에
    // resultData를 return으로 반환한다.
    return resultData;
  } catch (error) {
    return false;
  }
}

// 가장 큰(마지막) id 추출하기
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

// 이미지 업로드 함수
async function uploadImage(path, imgFile) {
  // 스토리지 객체 가져오기
  const storage = getStorage();

  // 저장할 이미지 객체 생성
  const imageRef = ref(storage, path);

  // file 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);

  // 저장한 파일의 url 가져오기
  const url = await getDownloadURL(imageRef);

  return url;
}

// 데이터 삭제
async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. 스토리지 객체를 가져온다.
  const storage = getStorage();

  // deleteDoc은 undefined를 반환하기 때문에 성공여부를 알기 위해 trycatch문에 넣는다.
  try {
    // 2. 스토리지에서 이미지 삭제
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);

    // 3. 컬렉션에서 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);

    // 성공적으로 삭제하면 true를 반환
    return true;
  } catch (error) {
    return false;
  }
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
