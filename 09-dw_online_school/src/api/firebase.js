import { initializeApp } from 'firebase/app';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyALde4FL5muDd2cNomJtXLHjrGv9SG-kFc',
  authDomain: 'dwos-cfe24.firebaseapp.com',
  projectId: 'dwos-cfe24',
  storageBucket: 'dwos-cfe24.appspot.com',
  messagingSenderId: '397358160537',
  appId: '1:397358160537:web:6e3ee618f5ce9c814eb608',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 전체 데이터 불러오기
async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const result = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return result;
}

// 단일 데이터 (조건에 해당하는) 불러오기
async function getData(collectionName, option) {
  const { field, condition, value } = option;
  const collect = await collection(db, collectionName);
  const q = query(collect, where(field, condition, value));
  const snapshot = await getDocs(q);
  // getDocs를 쓰는 이유? => 문서 아이디가 없어서 일치하는 slug로 조회하려고 하기 때문.
  const resultData = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };

  return resultData;
}

// 회원정보 불러오기
async function getMember(values) {
  const { email, password } = values;
  const collect = await collection(db, 'member');
  const q = query(collect, where('email', '==', email));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;

  let message;
  let memberObj = {};

  // ** 이메일과 패스워드 비교
  if (docs.length === 0) {
    // 이메일이 일치하지 않을 때
    message = '이메일이 올바르지 않습니다.';
  } else {
    // 이메일은 일치, 패스워드 비교
    const memberData = { ...docs[0].data(), docId: docs[0].id };

    if (memberData.password === password) {
      // 이메일, 패스워드 일치
      message = '로그인에 성공했습니다.';
      memberObj = {
        email: memberData.email,
        docId: memberData.docId,
      };
    } else {
      // 패스워드 불일치
      message = '비밀번호가 일치하지 않습니다.';
    }
  }

  return { memberObj, message };
}

async function updateDatas(collectionName, docId, updateObj, option) {
  // 문서의 reference 객체가 필요
  const docRef = doc(db, collectionName, docId);

  try {
    if (!option) {
      await updateDoc(docRef, updateObj);
    } else {
      if (option.type === 'ADD') {
        await updateDoc(docRef, {
          [option.fieldName]: arrayUnion(updateObj),
        });
      } else if (option.type === 'DELETE') {
        await updateDoc(docRef, {
          [option.fieldName]: arrayRemove(updateObj),
        });
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

export { getData, getDatas, getMember, updateDatas };
