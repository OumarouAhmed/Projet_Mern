function Badge({ text, color = "#4F46E5" }) {
    // Note: We are keeping inline styles for dynamic colors, but using CSS classes for structure
    return (
        <span
            className="badge"
            style={{
                backgroundColor: color,
                color: 'white',
                border: `2px solid ${color}33`
            }}
        >
            {text}
        </span>
    );
}

export default Badge;
