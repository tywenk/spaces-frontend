import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import dayjs from "dayjs"
import { Shield } from "@areatechnology/shields-react"

function Reply({ reply }) {
	return (
		<div className='bg-yellow-100 rounded-xl p-2 box-border border border-yellow-100 hover:border-yellow-400 border-solid'>
			<div id='pfp' className='w-16 h-16'>
				{reply.user?.shield && (
					<Shield
						fieldId={reply.user?.shield?.fieldId}
						colors={[
							reply.user?.shield?.color1,
							reply.user?.shield?.color2,
							reply.user?.shield?.color3,
							reply.user?.shield?.color4,
						]}
						hardwareId={reply.user?.shield?.hardwareId}
						frameId={reply.user?.shield?.frameId}
					/>
				)}
			</div>
			{reply.title && <p className='font-bold'>{reply.title}</p>}
			<ReactMarkdown
				children={reply.content}
				remarkPlugins={[remarkGfm]}
				className='truncate w-full'
			></ReactMarkdown>
			<p>{reply.user?.user_hash}</p>
			<p>{dayjs(reply.created_at).format("MMM D, h:mmA")}</p>
		</div>
	)
}

export default Reply
