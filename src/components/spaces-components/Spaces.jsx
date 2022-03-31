import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { DAppProvider, Mainnet } from "@usedapp/core"

const alchemyId = import.meta.env.VITE_ALCHEMY_KEY

const config = {}
// {
// 	readOnlyChainId: Mainnet.chainId,
// 	readOnlyUrls: {
// 		[Mainnet.chainId]: `https://eth-mainnet.alchemyapi.io/v2/${alchemyId}`,
// 	},
// }

function Spaces() {
	return (
		<DAppProvider config={config}>
			<div className='flex flex-row'>
				<Navbar />
				<Outlet />
			</div>
		</DAppProvider>
	)
}

export default Spaces
