import { useState, useEffect } from "react"
import { Shield } from "@areatechnology/shields-react"
import { useEthers } from "@usedapp/core"

function Profile() {
	const [user, setUser] = useState({})
	const { account } = useEthers()

	useEffect(() => {
		console.log(account)
		if (account) {
			fetch(`http://localhost:9292/users/${account}`)
				.then((res) => res.json())
				.then(setUser)
		}
	}, [account])

	return (
		<div className='h-screen grid place-content-center'>
			<div>
				<p>{account && account}</p>
				{user.shield && (
					<div>
						<Shield
							fieldId={user.shield?.fieldId}
							colors={[
								user.shield?.color1,
								user.shield?.color2,
								user.shield?.color3,
								user.shield?.color4,
							]}
							hardwareId={user.shield?.hardwareId}
							frameId={user.shield?.frameId}
						/>{" "}
					</div>
				)}
			</div>
		</div>
	)
}

export default Profile
