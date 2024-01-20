type User = {
    username: string;
    email: string;
    uid: string;
    profile_pic_url: string;
    timestamp: string;
    following?: string[];
}


type Post = {
    author: User;
    content: string;
    caption: string;
    location: string;
    timestamp: string;
    likes: number;
    likers: string[]
}

type ExtendedPost = {
    id: Post;
};
