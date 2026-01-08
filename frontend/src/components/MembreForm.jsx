import { useState } from "react";

function MembreForm({ onAddMembre }) {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [adresse, setAdresse] = useState('');
    const [numeroMembre, setNumeroMembre] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nom || !prenom || !email || !numeroMembre) {
            alert('Veuillez remplir les champs obligatoires');
            return;
        }

        const newMembre = {
            nom,
            prenom,
            email,
            adresse,
            numero_membre: numeroMembre
        };

        try {
            await onAddMembre(newMembre);
            setNom('');
            setPrenom('');
            setEmail('');
            setAdresse('');
            setNumeroMembre('');
        } catch (error) {
            // L'erreur est gérée par l'alerte dans App.jsx
        }
    };

    return (
        <div className="article-form">
            <h2>Inscrire un Nouveau Membre</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Nom :</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Prénom :</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Adresse :</label>
                    <input
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Numéro Membre :</label>
                    <input
                        type="text"
                        value={numeroMembre}
                        onChange={(e) => setNumeroMembre(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-submit"
                >
                    Inscrire le Membre
                </button>
            </form>
        </div>
    )
}

export default MembreForm;
