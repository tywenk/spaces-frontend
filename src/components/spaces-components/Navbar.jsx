import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import ConnectMM from "../ConnectMM"

function Navbar() {
	const [spaces, setSpaces] = useState([])

	useEffect(() => {
		fetch("http://localhost:9292/spaces")
			.then((res) => res.json())
			.then((data) => setSpaces(data.map((i) => i.space_name)))
	}, [])

	return (
		<nav className='flex flex-col justify-between h-screen bg-slate-200 rounded-2xl p-4 w-1/6'>
			<div>
				<Link to='/spaces'>
					<h1>Spaces</h1>
				</Link>
			</div>
			<div>
				<div className='flex flex-col'>
					<NavLink
						to='all'
						style={(isActive) => ({
							color: isActive ? "green" : "blue",
						})}
					>
						all
					</NavLink>
					{spaces &&
						spaces.map((space) => {
							return (
								<NavLink
									key={space}
									to={space}
									style={(isActive) => ({
										color: isActive ? "green" : "blue",
									})}
								>
									{space}
								</NavLink>
							)
						})}
				</div>
			</div>
			<div>
				<ConnectMM />
			</div>
		</nav>
	)
}

export default Navbar
