import { Link, useParams } from "react-router-dom"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import { Shield } from "@areatechnology/shields-react"

dayjs.extend(calendar)

function Post({ post, onClickPost }) {
	let params = useParams()

	let css =
		params.postId == post.id
			? "bg-orange-200 rounded-xl p-2 box-border border border-orange-500 hover:border-orange-400 border-solid"
			: "bg-yellow-100 rounded-xl p-2 box-border border border-yellow-500 hover:border-orange-700 border-solid"

	return (
		<div className={css}>
			<Link to={`${post.id}`} onClick={() => onClickPost(post)}>
				<div className='grid grid-cols-5 grid-rows-1 divide-x '>
					<div className='flex flex-col w-auto h-auto col-span-1 mr-1'>
						{post.user?.shield && (
							<Shield
								fieldId={post.user?.shield?.fieldId}
								colors={[
									post.user?.shield?.color1,
									post.user?.shield?.color2,
									post.user?.shield?.color3,
									post.user?.shield?.color4,
								]}
								hardwareId={post.user?.shield?.hardwareId}
								frameId={post.user?.shield?.frameId}
							/>
						)}
						<div className='font-mono text-sm w-full'>
							<p className='truncate'>{post.user.user_hash}</p>
						</div>
					</div>
					<div className='col-span-4 row-span-1'>
						<div className='ml-2'>
							<div>
								{post.title && <p className='font-bold'>{post.title}</p>}
							</div>
							<p className='text-sm text-stone-500'>
								{dayjs(post.created_at).calendar()}
							</p>
							<p>Replies: {post.replies.length}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default Post
