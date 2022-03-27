import { useParams } from "react-router-dom"
import Posts from "./Posts"
import Replies from "./Replies"

function Main() {
	let params = useParams()

	return (
		<div>
			<div>POSTS</div>
			<Posts />
			<div>REPLIES</div>
			<Replies />
		</div>
	)
}

export default Main
