import { useEffect, useState } from "react"
import {
	useParams,
	Outlet,
	Link,
	useOutletContext,
	useNavigate,
} from "react-router-dom"
import Post from "./Post"

function Posts() {
	const [posts, setPosts] = useState([])
	const [currSpaceName, setCurrSpaceName] = useState("")
	const [currPost, setCurrPost] = useState({})
	const [orderVal, setOrderVal] = useState("")
	const [orderKey, setOrderKey] = useState([])
	const [currUserId] = useOutletContext()

	let params = useParams()
	let navigate = useNavigate()

	//useEffects
	useEffect(() => {
		setCurrSpaceName(params.spaceName)
	}, [params])

	useEffect(() => {
		if (currSpaceName) {
			fetch(`http://localhost:9292/spaces/posts/${currSpaceName}`)
				.then((res) => res.json())
				.then(setPosts)
		}
	}, [currSpaceName])

	//handlers
	function handleClickPost(post) {
		setCurrPost(post)
	}

	function handleDeletePost(id) {
		fetch(`http://localhost:9292/posts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((deletedPost) => {
				let newPosts = posts.filter((post) => post.id !== deletedPost.id)
				setPosts(newPosts)
				setCurrPost({})
				navigate("./")
			})
	}

	function handleOrderChange(e) {
		let val = e.target.value
		setOrderVal(val)
		let orderKey = []
		//["prop to compare", bool to reverse or not]

		switch (val) {
			case "date-desc":
				orderKey = ["created_at", false]
				break
			case "date-asc":
				orderKey = ["created_at", true]
				break
			case "replies-desc":
				orderKey = ["replies.length", false]
				break
			case "replies-asc":
				orderKey = ["replies.length", true]
				break
			default:
				orderKey = ["created_at", false]
				break
		}
		setOrderKey(orderKey)
	}

	let orderedPosts = posts.sort((a, b) => {
		let propToCompare = orderKey[0]
		if (propToCompare == "created_at") {
			return new Date(b.created_at) - new Date(a.created_at)
		} else if (propToCompare == "replies.length") {
			return b.replies.length - a.replies.length
		} else {
			return new Date(b.created_at) - new Date(a.created_at)
		}
	})

	if (orderKey[1]) {
		orderedPosts = orderedPosts.reverse()
	}

	//if no posts, show loading
	if (posts.length < 1) return <div></div>

	return (
		<>
			<div className='h-screen'>
				<div className='h-full flex flex-col w-[26rem]'>
					<div className='bg-slate-200 rounded-l-3xl my-2 mr-1 border border-slate-400 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
						<div className='p-4'>
							<Link to=''>{currSpaceName}</Link>
						</div>

						<header className='flex flex-row justify-between px-4'>
							<div className='flex justify-center'>
								<Link
									to='new'
									className='bg-green-300 rounded-full px-4 py-1 text-green-900 border border-green-300 hover:border-green-500'
								>
									New Post
								</Link>
							</div>
							<select
								value={orderVal}
								onChange={handleOrderChange}
								className='bg-white rounded-xl'
							>
								<option value='date-desc'>Recent</option>
								<option value='date-asc'>Oldest</option>
								<option value='replies-desc'>Most Replies</option>
								<option value='replies-asc'>Least Replies</option>
							</select>
						</header>

						<div className='flex flex-col gap-1 rounded-md m-2'>
							{orderedPosts.map((post) => (
								<div key={post.id}>
									<Post post={post} onClickPost={handleClickPost} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<Outlet
				context={[
					currUserId,
					handleDeletePost,
					currPost,
					currSpaceName,
					posts,
					setPosts,
				]}
			/>
		</>
	)
}

export default Posts
