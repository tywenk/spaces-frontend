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
				.then((userData) => {
					console.log(userData)
					setUser(userData)
				})
		}
	}, [account])

	return (
		<div className='h-screen w-full grid place-content-center'>
			<div className='rounded-2xl border border-yellow-500 p-5'>
				<p className='font-mono'>{account && account}</p>
				<p>Posts: {user.posts?.length}</p>
				<p>Replies: {user.replies?.length}</p>
				{user.shield && (
					<div className='w-100 h-100'>
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
