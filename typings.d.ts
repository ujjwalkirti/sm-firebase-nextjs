type User = {
    username: string;
    email: string;
    uid: string;
    profile_pic_url: string;
    timestamp: string;

}


type Post = {
    author: User;
    content: string;
    caption:string;
    location: string;
    timestamp: string;
}
