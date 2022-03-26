import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Navbar from "./components/Navbar"
import Spaces from "./components/spaces-components/Spaces"
import Main from "./components/spaces-components/Main"

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/about' element={<About />}></Route>
				<Route path='/spaces' element={<Spaces />}>
					<Route index element={<Navbar />}></Route>
					<Route path=':spaceId' element={<Main />}></Route>
				</Route>
			</Routes>
		</Router>
	)
}

export default App
