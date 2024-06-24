import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [posts, setPost] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/post").then((response) => {
            response.json().then((posts) => {
                setPost(posts);
            });
        });
    }, []);
    return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
