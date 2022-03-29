import { Link } from "react-router-dom"

function Post({ post, handleOnClick }) {
	return (
		<div className='bg-yellow-400 rounded-lg m-2'>
			<div id='pfp' className='w-6 h-6 bg-pink-400'></div>

			<p>{post.user.user_hash}</p>
			<p>Replies: {post.replies.length}</p>
			<Link to={`${post.id}`} onClick={() => handleOnClick(post, post.replies)}>
				<div>{post.content}</div>
			</Link>
		</div>
	)
}

export default Post
