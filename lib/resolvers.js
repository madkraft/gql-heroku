"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
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
                throw new apollo_server_express_1.ApolloError(error);
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
                throw new apollo_server_express_1.ApolloError(error);
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
                return user || new apollo_server_express_1.ValidationError("User ID not found");
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError(error);
            }
        }
    }
};
//# sourceMappingURL=resolvers.js.map