import Badge from "./Badge";

function ProductCard({ name, price, category }) {
    return (
        <div style={{ display: 'inline-block' }}>
            <Badge text={name} color="#4F46E5"></Badge>
            <Badge text={`${price} €`} color="#10B981"></Badge>
            <Badge text={category} color="#F59E0B"></Badge>
        </div>
    );
}

export default ProductCard;
