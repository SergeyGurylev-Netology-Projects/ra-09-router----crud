import { useNavigate } from 'react-router-dom';
import React, {useContext, useState} from 'react';
import { PostsContext } from './context.tsx';

type FormElements  = HTMLFormControlsCollection & {
  body: HTMLInputElement;
}

type PostNewForm = HTMLFormElement & {readonly elements: FormElements}

export default function PostNew() {
  const [inputState, UpdateInputs] = useState({body: ''});
  const { posts_url } = useContext(PostsContext);
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

  const onSubmit = (e: React.FormEvent<PostNewForm>) => {
    e.preventDefault();
      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: inputState.body })
    };

    fetch(posts_url, requestOptions)
      .then(response => {
        if (response.ok) navigate('/posts');
      });
  }

  const onReset = (e: React.FormEvent<PostNewForm>) => {
    e.preventDefault();
    navigate('/posts');
  }

  return(
    <div>
      <form className={'post-new'} onSubmit={onSubmit} onReset={onReset}>
        <textarea name="body" className={'post-new--content'} value={inputState.body} onChange={onChange} required/>
        <div className={'post-new--toolbar'}>
          <button type='submit' className={'post-new--btn post-new--btn-submit'}>Опубликовать</button>
          <button type='reset' className={'post-new--btn post-new--btn-reset'}>Отменить</button>
        </div>
      </form>
    </div>
  )
}