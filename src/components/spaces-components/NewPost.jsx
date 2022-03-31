import { useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function NewPost() {
	const [
		currPostReplies,
		setCurrPostReplies,
		currPost,
		currSpaceName,
		posts,
		setPosts,
	] = useOutletContext()
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
			.then((r) => r.json())
			.then((post) => {
				setPosts([...posts, post])
				navigate(`../${post.id}`)
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		let title = e.target.title.value || "Untitled"
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
		<div className='h-screen grow'>
			<div className='h-full flex flex-col'>
				<div className='bg-slate-200 rounded-l-3xl my-2 mr-3 ml-2 border border-slate-400 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
					<h1 className='p-4'>Creating new post in {currSpaceName}</h1>
					<div className='flex flex-col gap-1 rounded-md m-4 justify-center'>
						<form onSubmit={handleSubmit}>
							<label htmlFor='title'>Title:</label>
							<br />
							<input
								type='text'
								id='title'
								value={title}
								name='title'
								onChange={(e) => setTitle(e.target.value)}
								className='border border-yellow-100'
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
								className='border border-yellow-100'
							/>
							<br />
							<div>
								<h1>Preview</h1>
								{textContent && (
									<div className='bg-yellow-100 rounded-xl p-2 min-h-fit'>
										<ReactMarkdown
											children={textContent}
											remarkPlugins={[remarkGfm]}
											// rehypePlugins={[rehypeHighlight]}
										></ReactMarkdown>
									</div>
								)}
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
		</div>
	)
}

export default NewPost