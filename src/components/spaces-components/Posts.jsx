import { useEffect, useState } from "react"
import { useParams, useNavigate, Outlet, Link } from "react-router-dom"
import dayjs from "dayjs"
import Post from "./Post"

function Posts() {
	const [posts, setPosts] = useState([])
	const [currSpaceName, setCurrSpaceName] = useState("")
	const [currPostReplies, setCurrPostReplies] = useState([])
	const [currReplyParent, setCurrReplyParent] = useState({})
	const [filterVal, setFilterVal] = useState("")

	let params = useParams()
	let navigate = useNavigate()

	//useEffects
	useEffect(() => {
		setCurrSpaceName(params.spaceName)
	}, [params])

	useEffect(() => {
		if (!!currSpaceName) {
			fetch(`http://localhost:9292/spaces/posts/${currSpaceName}`)
				.then((res) => res.json())
				.then(setPosts)
		}
	}, [currSpaceName])

	//handlers
	function handleClickPost(post, replies) {
		setCurrReplyParent(post)
		setCurrPostReplies(replies)
	}

	function handleFilterChange(e) {
		setFilterVal(e.target.value)
	}

	//if no posts, show loading
	if (posts.length < 1) return <div></div>

	return (
		<>
			<div className='h-screen bg-slate-200 rounded-3xl lg w-1/4 overflow-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
				<header className='flex flex-row justify-between p-4'>
					<div className='flex justify-center'>
						<Link to='new' className='bg-green-300 rounded-full px-4 py-1'>
							New Post
						</Link>
					</div>
					<select value={filterVal} onChange={handleFilterChange}>
						<option value='date-desc'>Date Descending</option>
						<option value='date-asc'>Date Ascending</option>
						<option value='replies-desc'>Replies Descending</option>
						<option value='replies-asc'>Replies Ascending</option>
					</select>
				</header>

				<div className='flex flex-col gap-1 bg-slate-200 rounded-md m-2'>
					{posts.map((post) => (
						<div key={post.id}>
							<Post post={post} onClickPost={handleClickPost} />
						</div>
					))}
				</div>
			</div>
			<Outlet context={[currPostReplies, currReplyParent, currSpaceName]} />
		</>
	)
}

export default Posts
