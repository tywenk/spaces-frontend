import { useState, useEffect } from "react"
import { useOutletContext, useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useEthers } from "@usedapp/core"

function NewPost({ isEdit }) {
	const [
		currUserId,
		handleDeletePost,
		postContentEditing,
		setPostContentEditing,
		currPost,
		currSpaceName,
		posts,
		setPosts,
	] = useOutletContext()
	const { account } = useEthers()
	const [title, setTitle] = useState("")
	const [textContent, setTextContent] = useState("")

	let params = useParams()
	let navigate = useNavigate()

	useEffect(() => {
		if (postContentEditing && isEdit) {
			setTitle(postContentEditing.title)
			setTextContent(postContentEditing.content)
		}
	}, [postContentEditing])

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

	function handleEditPost(id, editedTitleAndContent) {
		fetch(`http://localhost:9292/posts/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editedTitleAndContent),
		})
			.then((res) => res.json())
			.then((editedPost) => {
				console.log(editedPost)
				let newPosts = posts.map((p) => {
					if (p.id === editedPost.id) {
						p.content = editedPost.content
						return p
					} else {
						return p
					}
				})
				setPosts(newPosts)
				navigate(`../${id}`)
			})
	}

	function handleSubmit(e) {
		e.preventDefault()

		if (!account) {
			alert("Please connect wallet to post")
			return
		}

		if (!isEdit) {
			let title = e.target.title.value || "Untitled"
			let content = e.target.content.value
			let user_hash = account
			let space_name = currSpaceName

			let newPostObj = {
				title,
				content,
				views: 0,
				user_hash,
				space_name,
			}

			handleAddPost(newPostObj)
		}

		if (isEdit) {
			let title = e.target.title.value || "Untitled"
			let content = e.target.content.value
			let id = params.postId
			handleEditPost(id, { title, content })
		}
	}

	return (
		<div className='h-screen grow'>
			<div className='h-full flex flex-col'>
				<div className='bg-slate-200 rounded-l-3xl my-2 mr-3 ml-2 border border-slate-400 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
					{isEdit ? (
						<h1 className='p-4'>Editing post</h1>
					) : (
						<h1 className='p-4'>Creating new post in {currSpaceName}</h1>
					)}
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
							{account && (
								<div className='text-sm text-slate-600'>
									Posting from {account}
								</div>
							)}
							<br />
							<div>
								<h1>Preview</h1>
								{(textContent || title) && (
									<div className='bg-yellow-100 rounded-xl p-2 min-h-fit'>
										<div className='font-bold'>
											{title ? title : "Untitled"}
										</div>
										<br />
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
								value={isEdit ? "Submit edit" : "Post"}
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
