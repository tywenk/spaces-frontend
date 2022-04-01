import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import { Shield } from "@areatechnology/shields-react"

dayjs.extend(calendar)

function Reply({ reply, currUserId, onDelete, onEdit }) {
	return (
		<div className='bg-yellow-100 rounded-xl p-2 box-border border border-yellow-500 hover:border-yellow-700 border-solid'>
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
				<div className='row-span-5 col-span-4 border border-yellow-500 rounded-l-2xl divide-y items-center m-2 p-2'>
					<div className='row-span-1 flex flex-row justify-between mb-1'>
						<div>
							{reply.title && <p className='font-bold'>{reply.title}</p>}
							<p className='text-slate-500 text-sm'>
								{/* {dayjs(reply.created_at).format("MMM D, h:mmA")} */}
								{dayjs(reply.created_at).calendar()}
							</p>
						</div>
						<div>
							{currUserId == reply.user?.id && (
								<>
									<button
										onClick={() => onDelete(reply.id)}
										className='bg-red-300 text-red-900 rounded-full text-sm px-2 mx-1 py-0 cursor-pointer border border-red-300 hover:border-red-500'
									>
										Delete
									</button>
									<Link
										to={`./edit/${reply.id}`}
										onClick={() => onEdit(reply.content)}
										className='bg-slate-300 text-slate-900 rounded-full text-sm px-2 py-0 cursor-pointer border border-slate-300 hover:border-slate-500'
									>
										Edit
									</Link>
								</>
							)}
						</div>
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
