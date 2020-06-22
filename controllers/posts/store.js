const aws = require('aws-sdk');
const uuid = require('uuid4');
const Posts = require('../../models/Posts');
const Liked = require('../../models/Liked');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
})

const uploadImage = (params) => {
  return s3.upload(params).promise();
}

const createPost = async (data, files, user) => {
  const { comment } = data;
  const postData = {
    id_user: user.id,
    comment,
    liked: 0,
  };
  let post = null;
  let image = null;
  try {
    if (files) {
      const params = {
        Bucket: process.env.BUCKET,
        Key: uuid() + files.file.name,
        Body: files.file.data,
        ACL: 'public-read'
      };
      image = await uploadImage(params);
      postData.image = image.Location;
      post = await Posts.create({ ...postData }, { fields: ['id_user', 'comment', 'image'] });
    } else {
      post = await Posts.create({ ...postData }, { fields: ['id_user', 'comment'] });
    }
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
  return post;
};

const getPosts = async () => {
  let posts = [];
  try {
    posts = await Posts.findAll();
  } catch (error) {
    console.error(error);
    return 'fatal error';
  }
  return posts;
};

const updateLiked = async (id_liked_post, id_post, data ) => {
  let likes = null;
  try {
    const post = await Liked.findOne({ where: { id_post, id_owner_post: data.id, id_liked_post }, raw: true, nest: true })
    if (!post) {
      likes = await Liked.create({ id_liked_post, id_post, id_owner_post: data.id, liked: true });
    } else {
      const newliked = () => !post.liked;
      await Liked.update({ liked: newliked() }, { where: { id_liked_post, id_post, id_owner_post: data.id } });
      likes = await Liked.findOne({ where: { id_post, id_owner_post: data.id, id_liked_post }, raw: true, nest: true });
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
  return likes;
};

module.exports = { getPosts, createPost, updateLiked }