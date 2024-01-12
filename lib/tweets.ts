import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";






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

export { getUserTweets }
