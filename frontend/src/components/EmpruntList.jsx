import Badge from "./Badge";

function EmpruntList({ emprunts, onRetour }) {
    return (
        <div>
            <h2>Emprunts en cours</h2>
            {emprunts.length === 0 ? (
                <p>Aucun emprunt en cours.</p>
            ) : (
                emprunts.map(emprunt => (
                    <div key={emprunt._id} className="article-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3>{emprunt.livre?.titre || "Livre inconnu"}</h3>
                                <p className="article-meta">
                                    Emprunté par : {emprunt.membre?.nom} {emprunt.membre?.prenom}
                                </p>
                                <p className="article-content">
                                    Retour prévu le : {new Date(emprunt.date_retour_prevue).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <Badge
                                    text={emprunt.statut}
                                    color={emprunt.statut === 'en_retard' ? '#EF4444' : '#4F46E5'}
                                />
                                {emprunt.statut === 'en_cours' && (
                                    <button
                                        onClick={() => onRetour(emprunt._id)}
                                        className="btn btn-primary"
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Retourner
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default EmpruntList;
