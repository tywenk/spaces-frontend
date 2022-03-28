import { useEffect, useState } from "react"
import { useParams, useNavigate, Outlet } from "react-router-dom"

function Posts() {
	const [posts, setPosts] = useState([])
	const [currSpace, setCurrSpace] = useState("all")

	let params = useParams()

	useEffect(() => {
		setCurrSpace(params.spaceId)

		return () => {
			"unmounting params"
		}
	}, [params])

	useEffect(() => {
		fetch(`http://localhost:9292/posts/${currSpace}`)
			.then((res) => res.json())
			.then(setPosts)
	}, [currSpace])

	const handlePostClick = () => {}

	if (posts.length < 1) return <div>Loading...</div>

	return (
		<>
			<div>
				{posts.map((post) => (
					<div key={post.id} onClick={handlePostClick}>
						{post.content}
					</div>
				))}
			</div>
			<Outlet />
		</>
	)
}

export default Posts
