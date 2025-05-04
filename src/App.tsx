import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EditPost from './pages/EditPost';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail'; 

const App = () => {
  return (
    <>
      <header>
        <h1>Мой блог</h1>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/create">Создать пост</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} /> 
        </Routes>
      </main>
    </>
  );
};

export default App;
