import client from './config/graphql_client.mjs';
import posts from './data/posts.mjs';

const mutationCreatePost = `
  mutation createP($data: PostInput!) {
  createPost(data: $data) {
    amountLikes
    message
    comments {
      message
    }
    dateAdded
  }
}
`;

const queryAllUsers = `
query Query {
  usersPermissionsUsers {
    documentId
  }
}
`;

const getRandomUser = (users) => {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex].documentId;
};

(async () => {
  /*
   * Get all users
   */
  const getAllUsers = async () => {
    try {
      const { usersPermissionsUsers } = await client.request(queryAllUsers);
      if (usersPermissionsUsers.length === 0) {
        throw new Error("No users found in the database");
      }
      return usersPermissionsUsers;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /*
   * Create a Post (Local Provider)
   */
  const createPost = async ({ postId, dateAdded, user, message, amountLikes, comments }) => {
    let data = { "data": { dateAdded, message, amountLikes, user, comments } };
    try {
      const { createPost } = await client.request(mutationCreatePost, data);

      if (!createPost) {
        throw new Error(`Can't create the post with id ${postId}`);
      }

      console.log(`Post created with user ${user} and message ${message}`);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create posts
   */
  const createPosts = async () => {
    try {
      const users = await getAllUsers();
      for (const post of posts) {
        // eslint-disable-next-line no-await-in-loop
        const { dateAdded, message, amountLikes, comments } = post;
        const postUser = getRandomUser(users);
        const postComments = comments.map(comment => ({
          ...comment,
          user: getRandomUser(users)
        }));
        await createPost({
          dateAdded: new Date(dateAdded).toISOString(),
          user: postUser,
          message,
          amountLikes,
          comments: postComments,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create posts
   */
  createPosts();
})();
