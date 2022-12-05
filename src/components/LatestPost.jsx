import React from 'react';
import Image1 from '../images/creab.jpg'

function LatestPost() {
    return (
      <div className="card shadow-sm ">
        <div className="card-body">
        <p className='card-title text-center font-weight-bold'>LATEST POSTS</p>
      <div className="d-flex justify-content-between align-items-center gap-2" >
        <img src={Image1} className="card-img-top " height='50px' width='50px' alt="..." />
           <p>Lorem ipsum dolor sit amet consectetur adip
            !</p>
      </div>
      <div className="d-flex justify-content-between align-items-center" >
        <img src={Image1} className="card-img-top img" height='50px' width='50px' alt="..." />
           <p>Lorem ipsum dolor sit amet consectetur adip
            !</p>
      </div>
      <div className="d-flex justify-content-between align-items-center" >
        <img src={Image1} className="card-img-top img" height='50px' width='50px' alt="..." />
           <p>Lorem ipsum dolor sit amet consectetur adip
            !</p>
      </div>
    </div>
    </div>









    );
}

export default LatestPost;