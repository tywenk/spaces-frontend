import { Link } from "react-router-dom"

function Home() {
	return (
		<div>
			<div className='h-screen w-screen grid place-items-center '>
				<div className='flex align-middle'>
					<div className='text-slate-400'>SPACES</div>
					<br />
					<div className='text-slate-400'>forum for web3</div>
					<br />
					<Link
						to='/spaces'
						className='bg-green-300 rounded-full px-4 py-1 border border-green-300 hover:border-green-500'
					>
						{"Enter app -->"}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home
