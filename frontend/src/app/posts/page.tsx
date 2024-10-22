import React from 'react';

const PostsPage: React.FC = () => {
    const posts = [
        { id: 1, title: 'First Post' },
        { id: 2, title: 'Second Post' }
    ];
    const postAvailable = posts.length > 0 ? 'Posts available' : 'No posts';

    const handleClick = (event: any) => {
        console.log(event.target.innerText);
    };

    posts.length > 0 && 'Posts are available';

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts Page</h1>
            <ul className="list-disc pl-5">
            {posts.map(post => (
                <li key={post.id} className="mb-2">{post.title}</li>
            ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Click Me</button>
        </div>
    );
};

export default PostsPage;