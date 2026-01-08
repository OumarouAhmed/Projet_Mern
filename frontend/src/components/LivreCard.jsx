import Badge from "./Badge";

function LivreCard({ livre, onDelete }) {
    const isAvailable = livre.nombre_copies_disponibles > 0;

    return (
        <div className="article-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                    <h2>{livre.titre}</h2>
                    <p className="article-meta">
                        par : {livre.auteur} | ISBN: {livre.ISBN}
                    </p>
                </div>
                <Badge
                    text={isAvailable ? "Disponible" : "Indisponible"}
                    color={isAvailable ? "#10B981" : "#EF4444"}
                />
            </div>

            <p className="article-content">
                Stock: <strong>{livre.nombre_copies_disponibles}</strong> / {livre.nombre_copies_total}
            </p>

            <div className="article-actions">
                <button
                    onClick={() => onDelete(livre._id)}
                    className="btn btn-danger"
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}

export default LivreCard;
