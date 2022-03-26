import { useParams } from "react-router-dom"

function Main() {
	let params = useParams()

	return <div>Space: {params.spaceId}</div>
}

export default Main
