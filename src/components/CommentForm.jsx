import React from 'react';

function CommentForm() {
    return (
        <div className="col-md-6 col-sm-12 col-lg-9">
        <div className="card shadow-sm" style={{marginTop:"3rem"}}>
        <div className="card-body">
            <h1 className='card-title text-center'>LEAVE A COMMENT</h1>
            <div className='card-text'>
         <form style={{marginTop:"4rem"}}>
                    <input type="text" className="form-control form-control-lg" placeholder="Name"/>
                    <div className="mb-3 mt-3">
                        <textarea className="form-control" rows="5" id="comment" name="text" placeholder="Type your comment here "></textarea>
                    </div>
                </form>
                {/*<a href="/" className='class="continue-reading text-center text-uppercase link1'>Contact Us</a>*/}
                {/* <button type="button" class="btn btn-success mt-3">Contact Me</button> */}
            </div>
          </div>
        </div>
        </div>
    );
}

export default CommentForm;