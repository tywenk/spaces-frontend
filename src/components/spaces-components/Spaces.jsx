import { Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Posts from "./Posts"
import Replies from "./Replies"

function Spaces() {
	return (
		<div className='grid grid-cols-3'>
			<Navbar />
			<Routes>
				<Route path='/'>
					<Route path=':spaceId*' element={<Posts />}>
						<Route path=':postId' element={<Replies />}></Route>
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default Spaces
