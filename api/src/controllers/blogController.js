require('../models/mongooseConnection')
const multer  = require('multer')
const Post = require('../models/Blog')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  exports.upload = multer({storage: storage}).single('image')

const serverResponse = (status = 200) => ({
    success: true,
    message: "",
    data: [],
    status: status
})

exports.index = async(req, res) => {
    let response = serverResponse()
    // displaying all posts
    const posts = await Post.find({})
    response.data = posts;
    return res.status(response.status).json(response)
}

exports.blogPost = async(req, res) => {
    try {
        let response = serverResponse()
        const post = await Post.findById(req.params.id)
        post.view +=1
        await post.save()
        response.data = post;
        return res.status(response.status).json(response)
    } catch (error) {
        console.log(error)
    }
}

exports.add = async(req, res) => {
    const url = req.protocol + "://" + req.get("host");
    let imagePath = "";
    if (req.file) {
      imagePath = url + '/public/images/' + req.file.filename;
    }
    let response = serverResponse(201)
    const post = new Post(req.body)
    post.image = imagePath
    await post.save()
    response.data = post
    return res.status(response.status).json(response)
};

exports.edit = async(req, res) => {
    try {
        const baseUrl = req.protocol + "://" + req.get("host");
        let imagePath = "";
        if(req.file){
            imagePath = baseUrl + '/public/images' + req.file.filename;
        }
        let response = serverResponse();
        console.log(req.body)
        var updating={...req.body, image:imagePath}
        const  post = await Post.updateOne({_id:req.params.id}, updating)
        response.data = post  
        return res.status(response.status).json(response)
    } catch (error) {
        console.log(error)
    }
};

exports.delete = async(req, res) => {
    let response = serverResponse();
    const post = await Post.deleteOne({_id: req.params.id});
    response.data = post;
    return res.status(response.status).json(response)
};

exports.like = async(req, res) => {
    let response = serverResponse();
    const post = await Post.findById(req.params.id)
    if(post.like_count){
        post.like_count += 1
    } else {
        post.like_count = 1
    }
    await post.save()
    response.data = post;
    return res.status(response.status).json(response)
};

exports.dislike = async(req, res) => {
    let response = serverResponse();
    const post = await Post.findById(req.params.id)
    if(post.dislike_count){
        post.dislike_count += 1
    } else {
        post.dislike_count = 1
    }
    await post.save()
    response.data = post;
    return res.status(response.status).json(response)
};

exports.comments = async(req, res) => {
    let response = serverResponse();
    const post = await Post.findById(req.params.id)
    response.data = post.comments
    return res.status(response.status).json(response)
};

exports.addComment = async(req, res) => {
    let response = serverResponse();
    const post = await Post.findById(req.params.id)
    console.log(post)
    post.comments.push(req.body)
    post.save()
    response.data = post
    return res.status(response.status).json(response)
};

exports.editComment = async(req, res) => {
    let response = serverResponse();
    const post = await Post.findById(req.params.id)
for(const[property, value] of Object.entries(req.body)){
post.comments.id(req.params.cid)[property] = value
}

await post.save()
    return res.status(response.status).json(response)
};

exports.deleteComment = async(req, res) => {
    let response = serverResponse();
    return res.status(response.status).json(response)
};

exports.replyComment = async(req, res) => {
    let response = serverResponse();
    return res.status(response.status).json(response)
};