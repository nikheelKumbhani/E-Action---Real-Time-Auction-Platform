
import ProductCard from "../cards/ProductCard";

export const ProductList = ({ products }) => {
  return (
    <div className="product-page-container">
      <h1 className="page-title">Live Auction</h1>

      <div className="product-grid">
        {products?.slice(0, 12)?.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>

      <style jsx>{`
        .product-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 16px;
        }
        
        .page-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 32px;
          text-align: center;
          color: #333;
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
          justify-items: center;
        }
        
        @media (min-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 1280px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
};
