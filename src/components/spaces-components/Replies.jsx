import { useState, useEffect } from "react"
import { Outlet, Link, useParams, useOutletContext } from "react-router-dom"
import Reply from "./Reply"

function Replies() {
	const [postId, setPostId] = useState("")
	const [currReplies, setCurrReplies] = useState([])
	const [currPost, setCurrPost] = useState({})
	const [currSpaceName] = useOutletContext()

	let params = useParams()

	useEffect(() => {
		setPostId(params.postId)
	}, [params])

	useEffect(() => {
		if (postId) {
			fetch(`http://localhost:9292/replies/${postId}`)
				.then((res) => res.json())
				.then((data) => {
					setCurrReplies(data)
					// console.log(data)
				})

			fetch(`http://localhost:9292/posts/${postId}`)
				.then((res) => res.json())
				.then((data) => {
					setCurrPost(data)
					// console.log(data)
				})
		}
	}, [postId])

	return (
		<div className='grow h-screen max-w-full'>
			<div className='h-full flex flex-col '>
				<div className='flex flex-col gap-1 bg-slate-200 rounded-l-3xl my-2 ml-2 mr-3 border border-slate-400 overflow-auto scrollbar-thin scrollbar-thumb-slate-400'>
					<div className='flex flex-col gap-1 rounded-md m-2'>
						<Reply reply={currPost} />
						{currReplies.length > 0 &&
							currReplies.map((reply) => (
								<Reply key={reply.id} reply={reply} />
							))}
					</div>

					{params.postId && (
						<div className='flex justify-center'>
							<Link
								to='reply'
								className='bg-green-300 text-green-900 border border-slate-200 hover:border-green-500  rounded-full px-4 py-1 mb-5'
							>
								Reply
							</Link>
						</div>
					)}
					<Outlet context={[postId, currReplies, setCurrReplies]} />
				</div>
			</div>
		</div>
	)
}

export default Replies
