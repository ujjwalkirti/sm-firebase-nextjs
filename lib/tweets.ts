import { collection, query, where, onSnapshot, doc, getDoc, orderBy, getDocs } from "firebase/firestore";
import { db } from "./Firebase";


function setupTweetListeners(userId: string) {
    // Get the list of user IDs the current user is following from Firestore
    const userDocRef = doc(db, "users", userId);

    return getDoc(userDocRef).then((userDocSnapshot) => {
        const following = userDocSnapshot.data()?.following;

        // Add the current user's email to the list of followed users
        following.push(userDocSnapshot.data()?.email);

        // Get the tweets of each followed user from Firestore
        const tweetsPromises = following.map((emailId: string) => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                where("author.email", "==", emailId),
                orderBy("timestamp", "desc")
            );

            return getDocs(tweetsQuery).then((tweetsSnapshot) => {
                const tweets: Post[] = [];
                tweetsSnapshot.forEach((doc) => {
                    tweets.push(doc.data() as Post);
                });
                return tweets;
            });
        });

        return Promise.all(tweetsPromises).then((tweetsArrays) => {
            // Flatten the array of arrays into a single array
            return [].concat.apply([], tweetsArrays);
        });
    });
}





async function getUserTweets(email: string) {
    // Query the 'tweets' collection for documents where 'author.email' is equal to the provided email
    const tweetsQuery = query(
        collection(db, 'tweets'),
        where('author.email', '==', email)
    );
    const tweets: Post[] = [];

    // Listen for snapshot updates
    onSnapshot(tweetsQuery, (tweetsSnapshot) => {
        // Convert the snapshot to an array of tweets
        tweetsSnapshot.forEach((doc) => {
            tweets.push(
                doc.data() as Post
            );
        });
    });

    return tweets;
}

export { getUserTweets, setupTweetListeners }
