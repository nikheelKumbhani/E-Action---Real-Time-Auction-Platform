import { ImageGallery } from "./components/image-gallery"
import { ProductInfo } from "./components/product-info"
import { AuctionDetails } from "./components/auction-details"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/features/productSlice";
import { getUserById } from "../../redux/features/authSlice";
import { getAllCategories } from "../../redux/features/categorySlice";
import { Container } from "../../components/container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import ProductStatus from "./components/product-status";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { product, isLoading } = useSelector((state) => state.product);
  const { categorys } = useSelector((state) => state.category);
  const { selectedUser, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.user) {
      dispatch(getUserById(product.user));
    }
  }, [dispatch, product?.user]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading || !product) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  // Find the category details
  const category = categorys?.find(cat => cat._id === product.category) || {};

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-20">
        <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
          {product.images && product.images.length > 0 && (
            <Image
              src={product.images[currentImageIndex].filePath}
              alt={`Product image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-6">
          <ProductInfo product={product} />
          <AuctionDetails product={product} userBalance={user?.balance || 0} />
        </div>
      </div>


            <ProductStatus product={product} />
    </Container>
  )
}
