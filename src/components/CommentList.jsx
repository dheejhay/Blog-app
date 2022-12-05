import { useState } from 'react';
import Comment from './Comment';

function CommentList(props) {
    const [comments, setComments] = useState([]);
    return (
        <div>
        {comments.map((comment) => (
            <Comment
            key={comment._id}
            comment={comment}
            />
        ))}
        </div>
    );
}

export default CommentList;