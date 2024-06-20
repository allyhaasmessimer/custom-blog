export default function Post() {
    return (
        <div className="post">
            <div className="image">
                <img
                    src="https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                />
            </div>
            <div className="texts">
                <h2>Lorem Ipsum Dolor Sit Amet</h2>
                <p className="info">
                    <span className="author">Liesel</span>
                    <time dateTime="">2024-06-20</time>
                </p>
                <p className="summary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque malesuada pellentesque dolor, vitae facilisis eros
                    tempor id. Sed vitae odio eu metus tincidunt convallis non
                    at magna.
                </p>
            </div>
        </div>
    );
}
