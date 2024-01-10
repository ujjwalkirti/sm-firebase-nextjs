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
    const followingList: User[] = [];
    if (docSnap.exists()) {
        followingList.push(docSnap.data().following as User);
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
    const followersList: User[] = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        followersList.push(doc.data() as User);
    });
    return followersList;
}

export { getFollowing, getFollowers }
