import { Outlet } from "react-router-dom"
import { Provider, chain, defaultChains } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import Navbar from "./Navbar"

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const infuraId = import.meta.env.INFURA_ID

function Spaces() {
	return (
		<div className='flex flex-row'>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default Spaces
