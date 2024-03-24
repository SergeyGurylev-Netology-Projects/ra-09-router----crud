import { useNavigate, Link } from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import { PostsContext } from './context.tsx';

export default function Posts() {
  const [data, SetData] = useState(undefined);
  const { posts_url } = useContext(PostsContext);

  const loadData = () => {
    fetch(posts_url)
      .then(response => response.json())
      .then(data => SetData(data));
  }

  useEffect(() => loadData(), []);

  const navigate = useNavigate();

  const buttonNewPostCreate = () => {
    navigate('/posts/new');
  }

  return(
    <>
      <div className={'posts--toolbar'}>
        <button type='button' className={'posts--btn posts--btn-submit'} onClick={buttonNewPostCreate}>
          Создать пост
        </button>
      </div>
      {data &&
        <ul className={'posts'}>
          {data.map(el =>
            <li key={el.id}
                className={'posts-item'}
                // onMouseDown={() => onPostClick(el.id)}
            >
              <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/posts/${el.id}`}>
                <div className={'posts-item--top'}>
                  <div className={'posts-item--id'}>
                    <span>{el.id}</span>
                  </div>
                  <div className={'posts-item--created'}>
                    {el.created}
                  </div>
                </div>
                <div className={'posts-item--content'}>
                  {el.body}
                </div>
              </Link>
            </li>
          )}
        </ul>
      }
    </>
  )
}