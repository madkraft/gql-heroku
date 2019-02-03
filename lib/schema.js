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
const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);
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

  type Article {
    title: String!
    url: String!
    tags: [String!]
    starred: Boolean
    createTime: String!
    id: ID!
  }

  type Query {
    tweets: [Tweets]
    user(id: ID!): User
    # article(id: ID!): Article
    articles(starred: Boolean): [Article]
  }

  type Mutation {
    starArticle(id: ID!): Article
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
        },
        // async article(_, args) {
        //   try {
        //     const articleDoc = await admin
        //       .firestore()
        //       .doc(`articles/${args.id}`)
        //       .get();
        //     const article = articleDoc.data();
        //     if (!article) {
        //       return new ValidationError("Article ID not found");
        //     }
        //     return {
        //       ...article,
        //       createTime: articleDoc.createTime.toDate(),
        //       id: articleDoc.id
        //     };
        //   } catch (error) {
        //     throw new ApolloError(error);
        //   }
        // },
        async articles(_, args) {
            const articles = await admin.firestore().collection("articles");
            let articlesCollection;
            if (args.starred !== undefined) {
                articlesCollection = await articles.where("starred", "==", args.starred).get();
            }
            else {
                articlesCollection = await articles.get();
            }
            return articlesCollection.docs.map((article) => {
                return Object.assign({}, article.data(), { createTime: article.createTime.toDate(), id: article.id });
            });
        }
    },
    Mutation: {
        async starArticle(_, args) {
            try {
                const articleRef = admin.firestore().doc(`articles/${args.id}`);
                let articleDoc = await articleRef.get();
                const article = articleDoc.data();
                await articleRef.update({ starred: !article.starred });
                articleDoc = await articleRef.get();
                return Object.assign({}, articleDoc.data(), { id: articleDoc.id });
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        }
    }
};
//# sourceMappingURL=schema.js.map