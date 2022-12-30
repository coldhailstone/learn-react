import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

function ListPage() {
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
                    <Card key={post.id} title={post.title}>
                        <button>button</button>
                    </Card>
                )
            })}
        </div>
    )
}

export default ListPage;