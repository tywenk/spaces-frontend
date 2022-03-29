import { Outlet, useOutletContext } from "react-router-dom"

function Replies() {
	const [currPostReplies, currReplyParent, currSpaceName] = useOutletContext()

	return (
		<>
			<div className='h-screen bg-slate-300 rounded-2xl w-auto overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 hover:scrollbar-thumb-green-700'>
				<div>{currReplyParent.title}</div>
				<div>{currReplyParent.content}</div>

				{currPostReplies.length > 0 &&
					currPostReplies.map((reply) => (
						<div key={reply.id}>{reply.content}</div>
					))}
			</div>
			<Outlet />
		</>
	)
}

export default Replies
