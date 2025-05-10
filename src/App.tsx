import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home/Home';
import EditPost from './pages/EditPost/EditPost';
import CreatePost from './pages/CreatePost/CreatePost';
import PostDetail from './pages/PostDetail/PostDetail';
import styles from './styles/App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;