const response = require('../../utils/response');
const { getPosts, createPost, updateLiked } = require('./store');

const allPosts = async (req, res) => {
  const posts = await getPosts();
  if (posts) {
    response(res, 200, 'success', posts);
  }
  response(res, 400, 'error input', posts);
};

const create = async (req, res) => {
  const { body, files, userContent } = req
  const post = await createPost(body, files, userContent);
  if (post) {
    response(res, 200, 'success', post);
  }
  response(res, 400, 'failure', post);
}

const like = async (req, res) => {
  const { id_liked_post, id_post } = req.body;
  const liked = await updateLiked(id_liked_post, id_post, req.userContent);
  if (!liked.error) {
    response(res, 200, 'success', liked)
  }
  response(res, 400, 'failure', liked)
};

module.exports = { allPosts, create, like };
