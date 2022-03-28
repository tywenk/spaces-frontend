import { Link } from "react-router-dom"

function Home() {
	return (
		<div>
			<div>SPACES</div>
			<br />
			<div>forum for web3</div>
			<br />
			<Link to='/spaces'>Go to app</Link>
		</div>
	)
}

export default Home
