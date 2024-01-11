import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { db, realtimeDB } from "./Firebase";

async function getFollowedTweets(userId: string) {
    // Get the list of user IDs the current user is following from Firestore
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const following = userDocSnapshot.data()?.following;

    // Get the tweets of each followed user from Realtime Database
    let tweets: Post[] = [];
    for (let followedUserId of following) {
        const tweetsQuery = query(ref(realtimeDB, 'tweets'), orderByChild('author/uid'), equalTo(followedUserId));
        onValue(tweetsQuery, (tweetsSnapshot) => {
            tweets = [...tweets, ...tweetsSnapshot.val()];
        });
    }

    return tweets;
}

async function getUserTweets(userId: string) {
    // Query the 'tweets' node for tweets where 'author/uid' is equal to the current user's ID
    const tweetsQuery = query(ref(realtimeDB, 'tweets'), orderByChild('author/uid'), equalTo(userId));
    const tweets: Post[] = [];

    onValue(tweetsQuery, (tweetsSnapshot) => {
        // Convert the snapshot to an array of tweets
        tweetsSnapshot.forEach((childSnapshot) => {
            tweets.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
    });
    return tweets;
}

export { getFollowedTweets, getUserTweets }
