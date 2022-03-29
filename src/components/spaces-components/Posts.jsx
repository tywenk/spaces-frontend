import { useEffect, useState } from "react"
import { useParams, useNavigate, Outlet, Link } from "react-router-dom"
import Post from "./Post"

function Posts({ handleOnClick }) {
	const [posts, setPosts] = useState([])
	const [currSpaceId, setCurrSpaceId] = useState("")
	const [currPostReplies, setCurrPostReplies] = useState([])
	const [currReplyParent, setCurrReplyParent] = useState({})

	let params = useParams()
	let navigate = useNavigate()

	useEffect(() => {
		setCurrSpaceId(params.spaceId)
	}, [params])

	useEffect(() => {
		if (!!currSpaceId) {
			fetch(`http://localhost:9292/posts/${currSpaceId}`)
				.then((res) => res.json())
				.then(setPosts)
		}
	}, [currSpaceId])

	function handleOnClick(post, replies) {
		setCurrReplyParent(post)
		setCurrPostReplies(replies)
	}

	if (posts.length < 1) return <div>Loading...</div>

	return (
		<>
			<div className='h-screen bg-slate-400  w-1/4 overflow-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
				<ul className='bg-slate-200 rounded-md m-2'>
					{posts.map((post) => (
						<li key={post.id}>
							<Post post={post} handleOnClick={handleOnClick} />
						</li>
					))}
				</ul>
			</div>
			<Outlet context={[currPostReplies, currReplyParent]} />
		</>
	)
}

export default Posts
