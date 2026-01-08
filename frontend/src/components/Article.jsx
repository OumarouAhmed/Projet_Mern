function Article({ title, author, content, likes, onLike, onDelete }) {
    return (
        <article className="article-card">
            <h2>{title}</h2>
            <p className="article-meta">
                par : {author}
            </p>
            <p className="article-content">
                {content}
            </p>
            <div className="article-actions">
                <button
                    onClick={onLike}
                    className="btn btn-primary"
                >
                    Like
                </button>
                <span className="likes-count">
                    {likes} likes
                </span>

                <button
                    onClick={onDelete}
                    className="btn btn-danger"
                >
                    Supprimer
                </button>
            </div>
        </article>
    );
}

export default Article;
