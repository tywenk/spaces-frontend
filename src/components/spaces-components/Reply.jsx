import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import dayjs from "dayjs"
import { Shield } from "@areatechnology/shields-react"

function Reply({ reply }) {
	return (
		<div className='bg-yellow-100 rounded-xl p-2 box-border border border-yellow-100 hover:border-yellow-400 border-solid'>
			<div className='grid grid-cols-5 h-[10rem]'>
				<div className='col-span-2'>
					<div id='pfp' className=''>
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
						<p className='font-mono truncate text-sm'>
							{reply.user?.user_hash}
						</p>
						<p>{dayjs(reply.created_at).format("MMM D, h:mmA")}</p>
					</div>
				</div>
				<div className='col-span-3'>
					{reply.title && <p className='font-bold'>{reply.title}</p>}
					<ReactMarkdown
						children={reply.content}
						remarkPlugins={[remarkGfm]}
						className='truncate w-full'
					></ReactMarkdown>
				</div>
			</div>
		</div>
	)
}

export default Reply
