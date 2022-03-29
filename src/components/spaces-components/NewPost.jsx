import { useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function NewPost() {
	const [currPostReplies, currReplyParent, currSpaceName] = useOutletContext()
	const [title, setTitle] = useState("")
	const [textContent, setTextContent] = useState("")

	let navigate = useNavigate()

	function handleAddPost(newPostObj) {
		fetch(`http://localhost:9292/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPostObj),
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		let title = e.target.title.value
		let content = e.target.content.value
		//temp user_id
		let user_id = Math.floor(Math.random() * 10)
		let space_name = currSpaceName

		let newPostObj = {
			title,
			content,
			views: 0,
			user_id,
			space_name,
		}

		handleAddPost(newPostObj)
	}

	return (
		<div>
			<h1>Creating new post in {currSpaceName}</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='title'>Title:</label>
				<br />
				<input
					type='text'
					id='title'
					value={title}
					name='title'
					onChange={(e) => setTitle(e.target.value)}
					className='border border-sky-400'
				/>
				<br />
				<label htmlFor='content'>Content:</label>
				<br />
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
						// rehypePlugins={[rehypeHighlight]}
					></ReactMarkdown>
				</div>
				<br />
				<input type='submit' className='bg-green-300 rounded-full px-4 py-1' />
				<button onClick={() => navigate(`/spaces/${currSpaceName}`)}>
					Cancel
				</button>
			</form>
		</div>
	)
}

export default NewPost
