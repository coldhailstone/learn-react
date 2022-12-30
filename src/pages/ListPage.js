import axios from 'axios';
import { useState, useEffect } from 'react';

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
            <h1>Blogs</h1>
            {posts.map((post) => {
                return (
                    <div key={post.id}>{post.title}</div>
                )
            })}
        </div>
    )
}

export default ListPage;