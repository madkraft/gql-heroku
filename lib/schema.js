"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const admin = require("firebase-admin");
require("dotenv").config();
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
    })
});
// export const typeDefs = gql`
//   type Query {
//     tweets: [String]!
//     user(id: String!): String!
//   }
// `;
// export const resolvers = {
//   Query: {
//     tweets() {
//       return ["hello tweet"];
//     },
//     user(_: undefined, args: { id: string }) {
//       return `USERID is ${args.id}`;
//     }
//   }
// };
exports.typeDefs = apollo_server_1.gql `
  type User {
    id: ID!
    screenName: String!
    statusesCount: Int!
    tweets: [Tweets]!
  }

  type Tweets {
    id: ID!
    text: String!
    userId: String!
    user: User!
    likes: Int!
  }

  type Query {
    tweets: [Tweets]
    user(id: String!): User
  }
`;
exports.resolvers = {
    User: {
        async tweets(user) {
            try {
                const userTweets = await admin
                    .firestore()
                    .collection("tweets")
                    .where("userID", "==", user.id)
                    .get();
                return userTweets.docs.map((tweet) => tweet.data());
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
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
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
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
                return user || new apollo_server_1.ValidationError("User ID not found");
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        }
    }
};
//# sourceMappingURL=schema.js.map