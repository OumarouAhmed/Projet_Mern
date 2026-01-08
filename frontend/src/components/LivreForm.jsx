import { useState } from "react";

function LivreForm({ onAddLivre }) {
    const [titre, setTitre] = useState('');
    const [auteur, setAuteur] = useState('');
    const [ISBN, setISBN] = useState('');
    const [copies, setCopies] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titre || !auteur || !ISBN || copies === "" || parseInt(copies) < 0) {
            alert('Veuillez remplir tous les champs correctement (le nombre de copies doit être >= 0)');
            return;
        }

        const newLivre = {
            titre,
            auteur,
            ISBN,
            nombre_copies_total: parseInt(copies),
            nombre_copies_disponibles: parseInt(copies)
        };

        try {
            await onAddLivre(newLivre);
            setTitre('');
            setAuteur('');
            setISBN('');
            setCopies(1);
        } catch (error) {
            // L'erreur est déjà gérée par l'alerte dans App.jsx
        }
    };

    return (
        <div className="article-form">
            <h2>Ajouter un Nouveau Livre</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Titre :</label>
                    <input
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        placeholder="Titre du livre"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Auteur :</label>
                    <input
                        type="text"
                        value={auteur}
                        onChange={(e) => setAuteur(e.target.value)}
                        placeholder="Auteur"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">ISBN :</label>
                    <input
                        type="text"
                        value={ISBN}
                        onChange={(e) => setISBN(e.target.value)}
                        placeholder="ISBN"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Nombre de copies :</label>
                    <input
                        type="number"
                        min="0"
                        value={copies}
                        onChange={(e) => setCopies(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-submit"
                >
                    Ajouter le Livre
                </button>
            </form>
        </div>
    )
}

export default LivreForm;
