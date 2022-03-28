import { Routes, Route, Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Posts from "./Posts"
import Replies from "./Replies"

function Spaces() {
	return (
		<div className='grid grid-cols-3'>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default Spaces
