import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"

dayjs.extend(calendar)

function Post({ post, onClickPost }) {
	return (
		<div className='bg-yellow-300 rounded-xl p-2'>
			<div id='pfp' className='w-6 h-6 bg-blue-500'></div>

			<p>{post.user.user_hash}</p>
			{/* <p>{dayjs(post.created_at).format("MMM D, h:mmA")}</p> */}
			<p>{dayjs(post.created_at).calendar()}</p>
			<p>Replies: {post.replies.length}</p>
			<Link to={`${post.id}`} onClick={() => onClickPost(post, post.replies)}>
				<ReactMarkdown>{post.title}</ReactMarkdown>
			</Link>
		</div>
	)
}

export default Post
