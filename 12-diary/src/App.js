import { createContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getUserAuth } from './api/firebase';
// import {} from './api/itemReducer';
// import { userInitialState, userReducer } from './api/userReducer';
import { useDispatch } from 'react-redux';
import './App.css';
import Main from './Main';
import DiaryPage from './pages/DiaryPage';
import EditPage from './pages/EditPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NewPage from './pages/NewPage';
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
} from './store/diarySlice';
import { loginSuccess, logout } from './store/userSlice';

// export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const [userState, userDispatch] = useReducer(userReducer, userInitialState);

  // const items = useSelector((state) => state.diary.items);

  const dispatch = useDispatch();

  const auth = getUserAuth();
  const [user] = useAuthState(auth);

  // CREATE
  // const onCreate = async (values) => {
  //   const addObj = {
  //     createdAt: new Date().getTime(),
  //     updatedAt: new Date().getTime(),
  //     date: new Date(values.date).getTime(),
  //     content: values.content,
  //     emotion: values.emotion,
  //     userEmail: user.email,
  //   };

  //   await addItem('diary', addObj, dispatch);
  // };

  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: user.email,
    };

    const params = {
      collectionName: 'diary',
      addObj,
    };

    dispatch(addItem(params));
  };

  // UPDATE
  // const onUpdate = async (values) => {
  //   const updateObj = {
  //     updatedAt: new Date().getTime(),
  //     date: new Date(values.date).getTime(),
  //     emotion: values.emotion,
  //     content: values.content,
  //   };
  //   await updateItem('diary', values.docId, updateObj, dispatch);
  // };

  const onUpdate = async (values) => {
    const updateObj = {
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      emotion: values.emotion,
      content: values.content,
    };

    const params = {
      collectionName: 'diary',
      docId: values.docId,
      updateObj,
    };

    dispatch(updateItem(params));
  };

  // DELETE
  // const onDelete = async (docId) => {
  //   await deleteItem('diary', docId, dispatch);
  // };

  const onDelete = async (docId) => {
    const params = {
      collectionName: 'diary',
      docId,
    };

    dispatch(deleteItem(params));
  };

  useEffect(() => {
    // fetchItems(
    //   'diary',
    //   {
    //     conditions: [
    //       {
    //         field: 'userEmail',
    //         operator: '==',
    //         value: user ? user.email : 'admin@gmail.com',
    //       },
    //     ],
    //     orders: [{ field: 'date', direction: 'desc' }],
    //   },
    //   dispatch
    // );

    const params = {
      collectionName: 'diary',
      queryOptions: {
        conditions: [
          {
            field: 'userEmail',
            operator: '==',
            value: user ? user.email : 'admin@gmail.com',
          },
        ],
        orders: [{ field: 'date', direction: 'desc' }],
      },
    };

    dispatch(
      // 파라미터를 하나만 받아서 사용할 수 있기 때문에
      // 여러개의 파라미터를 전달해야할 경우, 객체로 묶어서 명시적으로 전달한다.
      fetchItems(params)
    );
  }, [user, dispatch]);

  useEffect(() => {
    // serialize(직렬화) : 데이터를 저장할 때 저장할 수 있는 형태로 변환하는 것.
    // serialize가 안되는 타입 => Promise, Symbol, Map, Set, function, class
    if (user) {
      dispatch(loginSuccess([user.email, true, null]));
    } else {
      dispatch(logout([null, false, null]));
    }
  }, [user, dispatch]);

  return (
    // <DiaryStateContext.Provider value={{ auth }}>
    <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main auth={auth} />}>
            <Route index element={<HomePage />} />
            <Route path="new" element={<NewPage />} />
            <Route path="edit/:id" element={<EditPage />} />
            <Route path="diary/:id" element={<DiaryPage />} />
            <Route path="login" element={<LoginPage auth={auth} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DiaryDispatchContext.Provider>
    // </DiaryStateContext.Provider>
  );
}

export default App;
