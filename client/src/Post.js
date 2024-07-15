import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
    _id,
    title,
    summary,
    cover,
    content,
    createdAt,
    author,
}) {
    return (
        <div className="post_page_box">
            <div className="post">
                <div className="image">
                    <Link to={`/post/${_id}`}>
                        <img src={cover} alt={title} />
                    </Link>
                </div>
                <div className="texts">
                    <Link to={`/post/${_id}`}>
                        <h2>{title}</h2>
                    </Link>
                    <p className="info">
                        <span className="author">{author?.username}</span>
                        <time dateTime="">
                            {format(new Date(createdAt), "MMM d, yyyy")}
                        </time>
                    </p>
                    <p className="summary">{summary}</p>
                </div>
            </div>
        </div>
    );
}
