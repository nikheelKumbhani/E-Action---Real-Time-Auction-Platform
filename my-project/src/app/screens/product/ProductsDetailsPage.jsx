import { ImageGallery } from "./components/image-gallery"
import { ProductInfo } from "./components/product-info"
import { AuctionDetails } from "./components/auction-details"
import { SellerInfo } from "./components/seller-info"
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/features/productSlice";
import { getAllCategories } from "../../redux/features/categorySlice";
import { Container } from "../../components/container";
import ProductStatus from "./components/product-status";
import { Loader2 } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);
  const { categorys } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Use populated category from backend, fallback to finding in categorys array
  const category = product.category?.name ? product.category : categorys?.find(cat => cat._id === product.category) || {};

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container>
        <div className="py-8">
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column: Image Gallery */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <ImageGallery images={product.images?.map(img => img.filePath) || []} />
            </div>

            {/* Right Column: Product Info & Auction Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <ProductInfo product={{ ...product, categoryDetails: category }} />
              </div>

              <AuctionDetails product={product} userBalance={user?.balance || 0} />
            </div>
          </div>

          {/* Bottom Section: Seller Info and Product Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seller Information - Now using product.user from populated data */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <SellerInfo seller={product.user} />
            </div>

            {/* Product Status */}
            <ProductStatus product={product} />
          </div>
        </div>
      </Container>
    </div>
  )
}
