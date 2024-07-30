// import { onAuthStateChanged } from 'firebase/auth';
// import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserAuth } from './api/firebase';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import './css/App.css';

function App() {
  const auth = getUserAuth();

  // 로그아웃
  const handleLogout = () => {
    auth.signOut();
  };

  // 1. firebase 활용
  // const user = auth.currentUser;
  // const [loginUser, setLoginUser] = useState(user);
  // useEffect(() => {
  //   // onAuthStateChanged : auth 감시(관찰)
  //   onAuthStateChanged(auth, (user) => {
  //     setLoginUser(user);
  //   });
  // }, []);

  // 2. react-firebase-hooks 활용
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h4> 🙌 소원을 빌어주세요!</h4>
        {user && (
          <button className="sign-out" onClick={handleLogout}>
            로그아웃
          </button>
        )}
      </header>
      <section>
        {user ? <ChatRoom auth={auth} /> : <SignIn auth={auth} />}
      </section>
    </div>
  );
}

export default App;
