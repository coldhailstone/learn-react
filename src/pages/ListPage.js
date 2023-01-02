import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

function ListPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        const response = await axios.get('http://localhost:3001/posts')
        setPosts(response.data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h1>Blogs</h1>
                <div>
                    <Link to="/blogs/create" className='btn btn-success'>
                        Create New
                    </Link>
                </div>
            </div>
            {posts.map((post) => {
                return (
                    <Card key={post.id} title={post.title} onClick={() => navigate('/blogs/edit')}>
                        <div>
                            <button 
                                className='btn btn-danger btn-sm' 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('zz')
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default ListPage;