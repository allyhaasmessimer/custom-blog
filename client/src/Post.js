import { format } from "date-fns";

export default function Post({
    title,
    summary,
    cover,
    content,
    createdAt,
    author,
}) {
    return (
        <div className="post">
            <div className="image">
                <img
                    src="https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                />
            </div>
            <div className="texts">
                <h2>{title}</h2>
                <p className="info">
                    <span className="author">{author?.username}</span>
                    <time dateTime="">
                        {format(new Date(createdAt), "MMM d, yyyy")}
                    </time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}
