import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import useToast from '../hooks/toast';
import LoadingSpinner from './LoadingSpinner';

function BlogForm({ editing }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [originTitle, setOriginTitle] = useState('');
    const [body, setBody] = useState('');
    const [originBody, setOriginBody] = useState('');
    const [publish, setPublish] = useState(false);
    const [originPublish, setOriginPublish] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addToast } = useToast();

    useEffect(() => {
      if (editing) {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setTitle(res.data.title)
            setOriginTitle(res.data.title)
            setBody(res.data.body)
            setOriginBody(res.data.body)
            setPublish(res.data.publish)
            setOriginPublish(res.data.publish)
            setLoading(false);
        }).catch((error) => {
            setError('someting went wrong in db')
            addToast({
                type: 'danger',
                text: 'someting went wrong in db'
            });
            setLoading(false);
        })
      }
    }, [id, editing]);

    const isEdited = () => {
      return title !== originTitle || body !== originBody || publish !== originPublish
    };

    const validateForm = () => {
        let validated = true;

        if (!title) {
            setTitleError(true);
            validated = false;
        } else {
            setTitleError(false);
        }

        if (!body) {
            setBodyError(true);
            validated = false;
        } else {
            setBodyError(false);
        }

        return validated;
    }

    const onSubmit = async () => {
        if (!validateForm()) return

        if (editing) {
            try {
                await axios.patch(`http://localhost:3001/posts/${id}`, {
                    title,
                    body,
                    publish
                });
                addToast({
                    type: 'success',
                    text: 'Successfully edited!'
                })
                navigate('/blogs');
            } catch (error) {
                addToast({
                    type: 'danger',
                    text: 'We could not update blog'
                })
            }
        } else {
            try {
                await axios.post('http://localhost:3001/posts', {
                    title,
                    body,
                    publish,
                    createdAt: Date.now()
                });
                addToast({
                    type: 'success',
                    text: 'Successfully created!'
                })
                navigate('/admin');
            } catch (error) {
                addToast({
                    type: 'danger',
                    text: 'We could not create blog'
                })
            }
        }
    };

    const goBack = () => {
      if (editing) {
        navigate(`/blogs/${id}`);
      } else {
        navigate('/admin');
      }
    }

    const onChangePublish = (e) => {
      setPublish(e.target.checked)
    }

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h1>{editing ? 'Edit' : 'Create' } a blog post</h1>
            <div className="mb-3">
                <label className='form-label'>Title</label>
                <input className={`form-control ${titleError ? 'border-danger' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)} />
                {titleError && <div className='text-danger'>
                    Title is required.
                </div>}
            </div>
            <div className="mb-3">
                <label className='form-label'>Body</label>
                <textarea className={`form-control ${bodyError ? 'border-danger' : ''}`} value={body} rows='20' onChange={(e) => setBody(e.target.value)} />
                {bodyError && <div className='text-danger'>
                    Body is required.
                </div>}
            </div>
            <div className='form-check mb-3'>
                <input className='form-check-input' type="checkbox" checked={publish} onChange={onChangePublish} />
                <label className='form-check-label'>Publish</label>
            </div>
            <button className='btn btn-primary' onClick={onSubmit} disabled={editing && !isEdited()}>
                {editing ? 'Edit' : 'Post' }
            </button>
            <button className='btn btn-danger ms-2' onClick={goBack}>
                Cancel
            </button>
        </div>
    );
};


BlogForm.propTypes = {
  editing: PropTypes.bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm;