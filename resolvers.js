const apollo = require("apollo-server");
const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  })
});

const resolvers = {
  User: {
    async tweets(user) {
      try {
        const userTweets = await admin
          .firestore()
          .collection("tweets")
          .where("userID", "==", user.id)
          .get();

        return userTweets.docs.map((tweet) => tweet.data());
      } catch (error) {
        throw new apollo.ApolloError(error);
      }
    }
  },
  Tweets: {
    async user(tweet) {
      try {
        const tweetAuthor = await admin
          .firestore()
          .doc(`users/${tweet.userId}`)
          .get();

        return tweetAuthor.data();
      } catch (error) {
        throw new apollo.ApolloError(error);
      }
    }
  },
  Query: {
    async tweets() {
      const tweets = await admin
        .firestore()
        .collection("tweets")
        .get();

      return tweets.docs.map((tweet) => tweet.data());
    },
    async user(_, args) {
      try {
        const userDoc = await admin
          .firestore()
          .doc(`users/${args.id}`)
          .get();

        const user = userDoc.data();

        return user || new apollo.ValidationError("User ID not found");
      } catch (error) {
        throw new apollo.ApolloError(error);
      }
    }
  }
};

module.exports = resolvers;
