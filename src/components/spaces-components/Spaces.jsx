import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Spaces() {
	return (
		<div className='flex flex-row'>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default Spaces
