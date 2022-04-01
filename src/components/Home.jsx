import { Link } from "react-router-dom"

function Home() {
	return (
		<div>
			<div className='bg-gradient-to-l from-orange-100 h-screen w-screen grid place-content-center'>
				<div className='h-full w-full flex flex-col gap-1 items-center'>
					<div className='text-slate-400 font-bold'>SPACES</div>

					<div className='text-slate-400'>forum 4 web3</div>

					<Link
						to='/spaces'
						className='bg-green-300 rounded-full px-4 py-1 mt-5 border border-green-300 hover:border-green-500'
					>
						{"Enter app"}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home
