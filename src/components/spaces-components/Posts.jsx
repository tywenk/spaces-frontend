import { useEffect, useState } from "react"

function Posts() {
	const [posts, setPosts] = useState({})

	useEffect(() => {
		fetch("http://localhost:9292/posts")
			.then((res) => res.json())
			.then(setPosts)
	}, [])

	if (!posts) return <div></div>

	return (
		<div>
			{posts.map((post) => (
				<div>post.content</div>
			))}
		</div>
	)
}

export default Posts
