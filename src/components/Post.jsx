/* eslint-disable react/prop-types */
export default function Posts({ posts, onDeletePost, onEditClick }) {
    return (
        <div>
            <h2 className=" text-xl p-4">All Posts</h2>
            <div className="ml-11 mb-4">
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <span>{post.id}</span>
                            <span>{post.title}</span>
                            <div>
                                <span onClick={() => onDeletePost(post.id)}>
                                    ❌
                                </span>
                                <span onClick={() => onEditClick(post)}>
                                    ✏️
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
