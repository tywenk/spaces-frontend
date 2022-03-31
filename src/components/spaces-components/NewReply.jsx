import { useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function NewReply() {
	const [postId, currPostReplies, setCurrPostReplies] = useOutletContext()
	const [textContent, setTextContent] = useState("")

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
				setCurrPostReplies([...currPostReplies, reply])
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		let content = e.target.content.value
		//temp user_id
		let user_id = Math.floor(Math.random() * 10)
		let post_id = parseInt(postId)

		let newReplyObj = {
			content,
			user_id,
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
					<form onSubmit={handleSubmit}>
						<textarea
							id='content'
							name='content'
							value={textContent}
							rows='4'
							cols='50'
							onChange={(e) => setTextContent(e.target.value)}
							className='border border-sky-400'
						/>
						<br />
						<div>
							<h1>Preview</h1>
							<ReactMarkdown
								children={textContent}
								remarkPlugins={[remarkGfm]}
							></ReactMarkdown>
						</div>
						<br />
						<input
							type='submit'
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
