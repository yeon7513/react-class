import { Outlet } from 'react-router-dom';
import '../css/App.font.css';
import styles from '../css/App.module.css';
import Footer from './Footer';
import Nav from './Nav';

function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      <Footer className={styles.footer} />
    </>
  );
}

export default App;
