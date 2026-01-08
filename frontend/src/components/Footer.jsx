function Footer({ author, year }) {
    return (
        <footer className="footer">
            <p>
                {year} {author} - Tous droits réservés
            </p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                crée avec React + Vite
            </p>
        </footer>
    );
}

export default Footer;
