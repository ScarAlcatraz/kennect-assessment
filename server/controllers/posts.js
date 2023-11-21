import Users from "../models/userSchema.js";
import Posts from "../models/postSchema.js";

// Create a Post
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;

    const user = await Users.findById(userId);

    const newPost = new Posts({
      userId: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description: description,
      comments: [],
    });

    await newPost.save();

    const posts = await Posts.find();

    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.massage });
  }
};

// Get posts for the feed
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
};

// Get posts of a specific user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Posts.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.massage });
  }
};

// Get specific post
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addCommentToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, newComment } = req.body;
    const post = await Posts.findById(postId);
    const user = await Users.findById(userId);
    if (!post) {
      throw new Error("Post not found");
    }
    post.comments.push({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      text: newComment,
    });
    await post.save();
    return post;
  } catch (error) {
    throw new Error(`Error adding comment: ${error.message}`);
  }
};

export const searchPostsByString = async (req, res) => {
  try {
    const searchString = req.body.searchTerm;
    if (!searchString) {
      return res.status(400).json({ error: "Search term is required" });
    }
    const escapedString = searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const posts = await Posts.find({
      $or: [
        { description: { $regex: escapedString, $options: "i" } },
        { comments: { $elemMatch: { $regex: escapedString, $options: "i" } } }
      ]
    });

    res.json({ posts });
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}