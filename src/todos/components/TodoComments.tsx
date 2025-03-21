import { FC } from 'react';

import { Comment } from '@todos/types/todos.d';
import { formatDate } from '@/common/utils/dates';
import CrownIcon from '@icons/CrownIcon';


interface TodoCommentsProps {
    comments: Comment[];
}

const TodoComments: FC<TodoCommentsProps> = ({ comments, }) => {
    return (
        <div className='flex flex-col gap-2'>
            <h3 className="text-xl font-bold">Comments</h3>
            {comments.length > 0 ? (
                <div className='flex flex-col gap-2'>
                    {comments.map((comment, index) => (
                        <div key={index} className='border border-zinc-500/20 rounded-md p-4 py-3 flex flex-col gap-2'>
                            <div className='flex justify-between items-center gap-3'>
                                <div className='relative'>
                                    <p className='font-bold'>{comment.user.username}</p>
                                    {comment.user.isSuperuser && (
                                        <div className='absolute top-0 -right-2 rotate-[35deg]'>
                                            <CrownIcon className='w-3 h-3 dark:fill-yellow-400 dark:stroke-yellow-400 fill-yellow-600 stroke-yellow-600' />
                                        </div>
                                    )}
                                </div>
                                
                                <p className='font-light opacity-50 text-sm'>{formatDate(comment.created)}</p>
                            </div>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='font-light opacity-70'>There are no comments yet.</p>
            )}
        </div>
    );
}

export default TodoComments;