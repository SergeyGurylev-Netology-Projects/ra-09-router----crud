import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostsContext } from './context.tsx';

export default function Post() {
  const { id } = useParams();
  const { posts_url } = useContext(PostsContext);

  const [inputState, UpdateInputs] = useState({
    id: '',
    body: '',
    created: ''
  });

  const loadData = () => {
    fetch(`${posts_url}/${id}`)
      .then(response => response.json())
      .then(data => UpdateInputs(data.post));
  }

  useEffect(() => loadData(), []);

  const navigate = useNavigate();

  const deletePost = () => {
    const requestOptions = {
      method: 'DELETE',
    };

    fetch(`${posts_url}/${id}`, requestOptions)
      .then(response => {
        if (response.ok) navigate('/posts');
      });
  }

  const editPost = () => {
    navigate(`/posts/${id}/edit`);
  }

  const onReset = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/posts');
  }

  return(
    <div>
      <form className={'post'} onReset={onReset}>
        <div className={'post--top'}>
          <div className={'post--id'}>{inputState.id}</div>
          <div className={'post--created'}>{inputState.created}</div>
        </div>
        <div className={'post--content'}>{inputState.body}</div>
        <div className={'post--toolbar'}>
          <button type='button' className={'post--btn post--btn-edit'} onClick={editPost}>Изменить</button>
          <button type='reset' className={'post--btn post--btn-reset'}>Отменить</button>
          <button type='button' className={'post--btn post--btn-delete'} onClick={deletePost}>Удалить</button>
        </div>
      </form>
    </div>
  )
}