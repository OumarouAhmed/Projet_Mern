import { useState } from "react";

function EmpruntForm({ livres, membres, onAddEmprunt }) {
    const [livreId, setLivreId] = useState('');
    const [membreId, setMembreId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!livreId || !membreId) {
            alert('Veuillez sélectionner un livre et un membre');
            return;
        }

        try {
            await onAddEmprunt({ livre: livreId, membre: membreId });
            setLivreId('');
            setMembreId('');
        } catch (error) {
            // L'erreur est gérée par l'alerte dans App.jsx
        }
    };

    return (
        <div className="article-form">
            <h2>Nouveau Prêt</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Livre :</label>
                    <select
                        value={livreId}
                        onChange={(e) => setLivreId(e.target.value)}
                        className="form-input"
                    >
                        <option value="">Sélectionner un livre</option>
                        {livres.filter(l => l.nombre_copies_disponibles > 0).map(livre => (
                            <option key={livre._id} value={livre._id}>
                                {livre.titre} (Dispo: {livre.nombre_copies_disponibles})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Membre :</label>
                    <select
                        value={membreId}
                        onChange={(e) => setMembreId(e.target.value)}
                        className="form-input"
                    >
                        <option value="">Sélectionner un membre</option>
                        {membres.map(membre => (
                            <option key={membre._id} value={membre._id}>
                                {membre.nom} {membre.prenom}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-submit"
                >
                    Valider l'Emprunt
                </button>
            </form>
        </div>
    )
}

export default EmpruntForm;
