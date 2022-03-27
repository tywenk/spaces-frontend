import { NavLink } from "react-router-dom"
import ConnectMM from "../ConnectMM"

function Navbar() {
	let spaces = ["wordcel", "shape rotator", "optimizor", "curatoor"]
	return (
		<nav>
			<div>
				<NavLink to='all'>all</NavLink>
				<NavLink to='wordcel'>wordcel</NavLink>
				<NavLink to='shape-rotator'>shape rotator</NavLink>
				<NavLink to='optimizor'>optimizor</NavLink>
				<NavLink to='curatoor'>curatoor</NavLink>
			</div>
			<div>
				<ConnectMM />
			</div>
		</nav>
	)
}

export default Navbar
