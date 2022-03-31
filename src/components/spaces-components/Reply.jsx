import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import dayjs from "dayjs"
import { Shield } from "@areatechnology/shields-react"

function Reply({ reply }) {
	return (
		<div className='bg-yellow-100 rounded-xl p-2 box-border border border-yellow-100 hover:border-yellow-400 border-solid'>
			<div className='grid grid-cols-5'>
				<div className='col-span-1'>
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
						<p className='font-mono truncate text-sm text-slate-500'>
							{reply.user?.user_hash}
						</p>
					</div>
				</div>
				<div className='row-span-5 col-span-4 border border-yellow-500 rounded-2xl divide-y items-center m-2 p-2'>
					<div className='row-span-1'>
						{reply.title && <p className='font-bold'>{reply.title}</p>}
						<p className='text-slate-500 text-sm'>
							{dayjs(reply.created_at).format("MMM D, h:mmA")}
						</p>
					</div>
					<ReactMarkdown
						children={reply.content}
						remarkPlugins={[remarkGfm]}
						className='truncate w-full row-span-4'
					></ReactMarkdown>
				</div>
			</div>
		</div>
	)
}

export default Reply
