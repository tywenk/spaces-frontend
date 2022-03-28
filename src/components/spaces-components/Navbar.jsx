import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import ConnectMM from "../ConnectMM"

function Navbar() {
	const [spaces, setSpaces] = useState([])

	useEffect(() => {
		fetch("http://localhost:9292/spaces")
			.then((res) => res.json())
			.then((data) => setSpaces(data.map((i) => i.space_name)))

		return () => {
			"unmounting spaces"
		}
	}, [])

	return (
		<nav className='flex flex-col justify-between h-screen p-5'>
			<div>
				<NavLink to='/spaces'>
					<h1>Spaces</h1>
				</NavLink>
			</div>
			<div>
				<div className='flex flex-col'>
					<NavLink to='all'>all</NavLink>
					{spaces &&
						spaces.map((space) => {
							return (
								<NavLink key={space} to={space}>
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
