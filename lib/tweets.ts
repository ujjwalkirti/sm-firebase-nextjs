import { doc, getDoc } from 'firebase/firestore';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { db, realtimeDB } from "./Firebase";

async function getFollowedTweets(userId: string) {
    // Get the list of user IDs the current user is following from Firestore
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const following = userDocSnapshot.data()?.following;
    console.log(following);
    // Get the tweets of each followed user from Realtime Database
    let tweets: Post[] = [];
    for (let followedUserId of following) {
        const tweetsQuery = query(ref(realtimeDB, 'tweets'), orderByChild('author/email'), equalTo(followedUserId));
        onValue(tweetsQuery, (tweetsSnapshot) => {
            tweets = [...tweets, ...tweetsSnapshot.val()];
        });
    }

    // Add the current user's tweets
    const userTweetsQuery = query(ref(realtimeDB, 'tweets'), orderByChild('author/email'), equalTo(userId));
    onValue(userTweetsQuery, (userTweetsSnapshot) => {
        tweets = [...tweets, ...userTweetsSnapshot.val()];
    });

    // Sort the tweets by timestamp
    tweets.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    return tweets;
}

async function getUserTweets(userId: string) {
    // Query the 'tweets' node for tweets where 'author/uid' is equal to the current user's ID
    const tweetsQuery = query(ref(realtimeDB, 'tweets'), orderByChild('author/email'), equalTo(userId));
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
