import { useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useEthers } from "@usedapp/core"

function NewReply() {
	const [postId, setCurrReplies] = useOutletContext()
	const [textContent, setTextContent] = useState("")
	const { account } = useEthers()

	let navigate = useNavigate()

	function handleAddReply(newReplyObj) {
		navigate(-1)
		fetch(`http://localhost:9292/replies`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newReplyObj),
		})
			.then((r) => r.json())
			.then((reply) => {
				console.log(reply)
				setCurrReplies((currentReplies) => [...currentReplies, reply])
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!account) {
			alert("Please connect wallet to reply")
			return
		}

		let content = e.target.content.value
		let user_hash = account
		let post_id = parseInt(postId)

		let newReplyObj = {
			content,
			user_hash,
			post_id,
		}

		handleAddReply(newReplyObj)
	}

	return (
		<div className='m-2'>
			<div className="bg-yellow-100 rounded-xl p-2 box-border border-1 border-yellow-100 hover:border-slate-500 border-solid'">
				<div className='flex flex-col gap-1 rounded-md m-4 justify-center'>
					<h1>New Reply</h1>
					<br />
					{account && (
						<div className='text-sm text-slate-600'>
							Replying from {account}
						</div>
					)}
					<br />
					<form onSubmit={handleSubmit}>
						<textarea
							id='content'
							name='content'
							value={textContent}
							rows='4'
							cols='50'
							onChange={(e) => setTextContent(e.target.value)}
							className='border border-yellow-500'
						/>
						<br />

						<div>
							<h1>Preview</h1>
							<div className='border border-yellow-500 rounded-2xl divide-y items-center m-2 p-2'>
								<ReactMarkdown
									children={textContent}
									remarkPlugins={[remarkGfm]}
								></ReactMarkdown>
							</div>
						</div>
						<br />
						<input
							type='submit'
							value='Reply'
							className='bg-green-300 text-green-900 rounded-full px-4 py-1 cursor-pointer border border-green-300 hover:border-green-500'
						/>
					</form>
					<div>
						<button
							className='bg-red-300 text-red-900 rounded-full px-4 py-1 cursor-pointer border border-red-300 hover:border-red-500'
							onClick={() => navigate("../")}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewReply
