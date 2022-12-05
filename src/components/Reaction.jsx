import React from "react";

function Reaction(props) {
 
    return (
        <div>
            <span className='card-text pt-2'>{props.like_count}</span>
            <button className='btn btn-default' onClick={props.likePost}>
                <i className='bi bi-hand-thumbs-up-fill'></i>
            </button>

            <span className='card-text pt-2'>{props.dislike_count}</span>
            <button className='btn btn-default' onClick={props.dislikePost}>
                <i className='bi bi-hand-thumbs-down-fill'></i>
            </button>

            <span className='card-text pt-2'>{props.view_count}</span>
            <button className='btn btn-default'>
                <i className='bi bi-eye-fill'></i>
            </button>
        </div>
    );
}

export default Reaction;