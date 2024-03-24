import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostsContext } from './context.tsx';

type FormElements  = HTMLFormControlsCollection & {
  body: HTMLInputElement;
}

type PostEditForm = HTMLFormElement & {readonly elements: FormElements}

export default function PostEdit() {
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    UpdateInputs({
        ...inputState,
        [name]: value,
      }
    );
  }

  const onSubmit = (e: React.FormEvent<PostEditForm>) => {
    e.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: inputState.id, body: inputState.body })
    };

    fetch(`${posts_url}/${id}`, requestOptions)
      .then(response => {
        if (response.ok) navigate('/posts');
      });
  }

  const onReset = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/posts');
  }

  return(
    <div>
      <form className={'post'} onSubmit={onSubmit} onReset={onReset}>
        <div className={'post--top'}>
          <div className={'post--id'}>{inputState.id}</div>
          <div className={'post--created'}>{inputState.created}</div>
        </div>
        <textarea name="body" className={'post--content'} value={inputState.body} onChange={onChange} required/>
        <div className={'post--toolbar'}>
          <button type='submit' className={'post--btn post--btn-edit'}>Сохранить</button>
          <button type='reset' className={'post--btn post--btn-reset'}>Отменить</button>
        </div>
      </form>
    </div>
  )
}