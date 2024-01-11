import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "./Firebase";


// Function to get the list of users that the current user is following
async function getFollowing(userId: string) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    let followingList: User[] = [];
    if (docSnap.exists()) {
        followingList = docSnap.data().following;
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    return followingList;
}

// Function to get the list of users that are following the current user
async function getFollowers(userId: string) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("following", "array-contains", userId));
    const querySnapshot = await getDocs(q);
    let followersList: User[] = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        followersList.push(doc.data() as User);
    });
    return followersList;
}

async function getAllPostsMadeByCurrentUser(userId: string) {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("author", "==", userId));
    const querySnapshot = await getDocs(q);
    let postsList: Post[] = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        postsList.push(doc.data() as Post);
    });
    return postsList;
}


async function getAllUsers() {
    const usersCollectionRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollectionRef);

    const users = usersSnapshot.docs.map(doc => doc.data());

    return users;
}

export { getFollowing, getFollowers, getAllPostsMadeByCurrentUser, getAllUsers }
