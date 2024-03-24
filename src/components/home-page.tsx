import {useContext, useEffect, useState} from 'react';
import { PostsContext } from './context.tsx';

export default function HomePage() {
  const [data, SetData] = useState('');
  const { posts_url } = useContext(PostsContext);

  const loadData = () => {
    fetch(posts_url)
      .then(response => response.text())
      .then(data => SetData(data));
  }

  useEffect(() => loadData(), []);

  return(
    <div>
      {data}
    </div>
  )
}