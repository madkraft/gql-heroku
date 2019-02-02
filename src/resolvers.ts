// import { ApolloError, ValidationError } from "apollo-server-express";
// import * as admin from "firebase-admin";
// import { User, Tweet } from "./models";
// const serviceAccount = require("../service-account.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// export const resolvers = {
//   User: {
//     async tweets(user: User) {
//       try {
//         const userTweets = await admin
//           .firestore()
//           .collection("tweets")
//           .where("userID", "==", user.id)
//           .get();

//         return userTweets.docs.map((tweet) => tweet.data());
//       } catch (error) {
//         throw new ApolloError(error);
//       }
//     }
//   },
//   Tweets: {
//     async user(tweet: Tweet) {
//       try {
//         const tweetAuthor = await admin
//           .firestore()
//           .doc(`users/${tweet.userId}`)
//           .get();

//         return tweetAuthor.data();
//       } catch (error) {
//         throw new ApolloError(error);
//       }
//     }
//   },
//   Query: {
//     async tweets() {
//       const tweets = await admin
//         .firestore()
//         .collection("tweets")
//         .get();

//       return tweets.docs.map((tweet) => tweet.data());
//     },
//     async user(_, args) {
//       try {
//         const userDoc = await admin
//           .firestore()
//           .doc(`users/${args.id}`)
//           .get();

//         const user = userDoc.data();

//         return user || new ValidationError("User ID not found");
//       } catch (error) {
//         throw new ApolloError(error);
//       }
//     }
//   }
// };
