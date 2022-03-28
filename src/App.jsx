import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Spaces from "./components/spaces-components/Spaces"
import Posts from "./components/spaces-components/Posts"
import Replies from "./components/spaces-components/Replies"

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/about' element={<About />}></Route>
				<Route path='/spaces' element={<Spaces />}>
					<Route path=':spaceId' element={<Posts />}>
						<Route path=':postId' element={<Replies />}></Route>
					</Route>
				</Route>
			</Routes>
		</Router>
	)
}

export default App
