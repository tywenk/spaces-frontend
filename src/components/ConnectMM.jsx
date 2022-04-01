import { useEffect } from "react"
import { useEthers } from "@usedapp/core"

function ConnectMM({ onNewUser }) {
	const { activateBrowserWallet, deactivate, account } = useEthers()

	function handleConnectWallet() {
		activateBrowserWallet()
	}

	useEffect(() => {
		if (account) {
			fetch(`http://localhost:9292/users/new`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ account }),
			})
				.then((r) => r.json())
				.then((data) => {
					console.log("User and shield: ", data)
					onNewUser(data.user_id)
				})
		}
	}, [account])

	return account ? (
		<div className='w-full'>
			<div className=' text-slate-900 rounded-xl px-4 py-1 cursor-pointer w-full border border-slate-300 hover:border-slate-500'>
				<div className='truncate text-sm'>Connected as</div>
				<div className='truncate font-mono'>{account}</div>
			</div>
			<div
				className='truncate cursor-pointer text-sm bg-red-300 text-red-800 rounded-xl px-4 py-0 mt-1 border border-red-300 hover:border-red-500'
				onClick={deactivate}
			>
				Disconnect
			</div>
		</div>
	) : (
		<button
			className='bg-green-300 text-green-900 rounded-full px-4 py-1 cursor-pointer w-full border border-green-300 hover:border-green-500'
			onClick={handleConnectWallet}
		>
			Connect wallet
		</button>
	)
}

export default ConnectMM
