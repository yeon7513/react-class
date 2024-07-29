import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getUserAuth } from './api/firebase';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import './css/App.css';

function App() {
  const auth = getUserAuth();
  const user = auth.currentUser;

  const [loginUser, setLoginUser] = useState(user);

  // 로그아웃
  const handleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    // onAuthStateChanged : auth 감시(관찰)
    onAuthStateChanged(auth, (user) => {
      setLoginUser(user);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <h4> 🙌 소원을 빌어주세요!</h4>
        <button onClick={handleLogout}>로그아웃</button>
      </header>
      <section>
        {loginUser ? <ChatRoom /> : <SignIn auth={auth} login={setLoginUser} />}
      </section>
    </div>
  );
}

export default App;
