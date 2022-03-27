import { Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Main from "./Main"

function Spaces() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/'>
					<Route path=':spaceId' element={<Main />}></Route>
				</Route>
			</Routes>
		</div>
	)
}

export default Spaces
