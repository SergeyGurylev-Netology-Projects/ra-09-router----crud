import './App.css'
import Posts from './components/posts.tsx';
import Post from './components/post.tsx';
import PostEdit from './components/post-edit.tsx';
import PostNew from './components/post-new.tsx';
import HomePage from './components/home-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {

  return (
    <BrowserRouter>
      <div className="page">
        <Routes>
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<h1>404 | Страница не найдена</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
