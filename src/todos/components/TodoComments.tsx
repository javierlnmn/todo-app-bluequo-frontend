import { FC, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';

import { useUserStore } from '@auth/stores/userStore';
import { isOwnerOrAdmin } from '@auth/utils/user';

import { formatDate } from '@common/utils/dates';

import { Comment } from '@todos/types/todos.d';
import { deleteComment } from '@todos/services/comments';

import CrownIcon from '@icons/CrownIcon';
import TrashIcon from '@icons/TrashIcon';


interface TodoCommentsProps {
    comments: Comment[];
}

const TodoComments: FC<TodoCommentsProps> = ({ comments }) => {
    const { username, isSuperuser } = useUserStore();
    
    const [commentList, setCommentList] = useState(comments);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: (commentId) => {
            setCommentList((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            toast.success('Comment deleted successfuly!', {
				className: '!bg-zinc-100 dark:!bg-zinc-800 !text-zinc-800 dark:!text-zinc-200',
			});
        },
        onError: () => {
            toast.error('Oops! An error occured while deleting a comment!', {
				className: '!bg-zinc-100 dark:!bg-zinc-800 !text-zinc-800 dark:!text-zinc-200',
			});
        }
    });

    const handleDeleteComment = (id: string) => {
        mutation.mutate(id);
    };

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Comments</h3>
            {commentList.length > 0 ? (
                <div className="flex flex-col gap-3">
                    <AnimatePresence>
                        {commentList.map((comment) => (
                            <motion.div
                                layout
                                key={comment.id}
                                className="bg-zinc-200 dark:bg-zinc-700 rounded-md p-3 py-2 flex flex-col gap-2"
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex justify-between items-center gap-3">
                                    <div className="relative">
                                        <p className="font-bold">{comment.user.username}</p>
                                        {comment.user.isSuperuser && (
                                            <div className="absolute top-0 -right-2 rotate-[35deg]">
                                                <CrownIcon className="w-3 h-3 dark:fill-yellow-400 dark:stroke-yellow-400 fill-yellow-600 stroke-yellow-600" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        {isOwnerOrAdmin(isSuperuser, username, comment.user.username) && (
                                            <button onClick={() => handleDeleteComment(comment.id)}>
                                                <TrashIcon className="w-4 h-4 cursor-pointer hover:text-red-500 transition-colors" />
                                            </button>
                                        )}
                                        <p className="font-light opacity-50 text-sm">{formatDate(comment.created)}</p>
                                    </div>
                                </div>
                                <p>{comment.content}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <p className="font-light opacity-70">There are no comments yet.</p>
            )}
        </div>
    );
};

export default TodoComments;
