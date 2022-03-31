import { useState, useEffect } from "react"
import { Outlet, Link, useParams, useOutletContext } from "react-router-dom"
import Reply from "./Reply"

function Replies() {
	const [postId, setPostId] = useState("")
	const [currPostReplies, setCurrPostReplies, currPost, currSpaceName] =
		useOutletContext()

	let params = useParams()

	useEffect(() => {
		setPostId(params.postId)
	}, [params])

	return (
		<div className='grow h-screen max-w-full'>
			<div className='h-full flex flex-col '>
				<div className='flex flex-col gap-1 bg-slate-200 rounded-l-3xl my-2 ml-2 mr-3 border border-slate-400 overflow-auto scrollbar-thin scrollbar-thumb-slate-400'>
					<div className='flex flex-col gap-1 rounded-md m-2'>
						<Reply reply={currPost} />
						{currPostReplies.length > 0 &&
							currPostReplies.map((reply) => (
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
					<Outlet context={[postId, currPostReplies, setCurrPostReplies]} />
				</div>
			</div>
		</div>
	)
}

export default Replies
