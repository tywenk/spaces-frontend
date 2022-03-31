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

	const passiveState =
		"border rounded-xl border-slate-300 hover:border-slate-500 border-solid p-1 pl-2"
	const activeState = "border rounded-xl border-slate-800 border-solid p-1 pl-2"

	return (
		<div className='h-screen  '>
			<div className='h-full w-[14rem] flex flex-col'>
				<div className='flex flex-col justify-between h-full bg-slate-100 rounded-3xl p-4 my-2 mx-3 border border-slate-400'>
					<div>
						<Link to='/spaces'>
							<h1>Spaces</h1>
						</Link>
					</div>
					<div>
						<div className='flex flex-col gap-1'>
							{spaces &&
								spaces.map((space) => {
									return (
										<NavLink
											key={space}
											to={space}
											className={({ isActive }) =>
												isActive ? activeState : passiveState
											}
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
				</div>
			</div>
		</div>
	)
}

export default Navbar
