import { useState } from "react";

function ArticleForm({ onAddArticle }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !author || !content) {
            alert('Veuillez remplir tous les champs du formulaire');
            return;
        }

        const newArticle = {
            id: Date.now(),
            title,
            author,
            content,
            likes: 0
        };

        onAddArticle(newArticle);

        setTitle('');
        setAuthor('');
        setContent('');
    };

    return (
        <div className="article-form">
            <h2>Ajouter un nouvel article</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Titre :</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Le titre de votre article"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Auteur :</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Nom de l'auteur"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Contenu :</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Contenu de l'article"
                        rows="5"
                        className="form-textarea"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-submit"
                >
                    Publier l'article
                </button>
            </form>
        </div>
    )
}

export default ArticleForm;
