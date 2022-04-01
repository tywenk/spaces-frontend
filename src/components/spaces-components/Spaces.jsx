import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { DAppProvider, Mainnet } from "@usedapp/core"

// const alchemyId = import.meta.env.VITE_ALCHEMY_KEY

const config = {}
// {
// 	readOnlyChainId: Mainnet.chainId,
// 	readOnlyUrls: {
// 		[Mainnet.chainId]: `https://eth-mainnet.alchemyapi.io/v2/${alchemyId}`,
// 	},
// }

function Spaces() {
	const [currUserId, setCurrUserId] = useState("")

	function handleGetUserId(id) {
		setCurrUserId(id)
	}

	return (
		<DAppProvider config={config}>
			<div className='flex flex-row bg-gradient-to-l from-orange-100 '>
				<Navbar onNewUser={handleGetUserId} />
				<Outlet context={[currUserId]} />
			</div>
		</DAppProvider>
	)
}

export default Spaces
