"use client";
import ProductGallery from "@/components/product/ProductGallery";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";
import { useApiClient } from "@/utils/apiClient";
import { Product } from "@/types";
import React, { useEffect, useState } from "react";

// Define the props interface for the component
interface ProductIdPageProps {
  params: { productId: string };
}

// Define the main component
const ProductIdPage = ({ params }: ProductIdPageProps) => {
  const { get } = useApiClient();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await get<{ metadata: Product }>(`/product/${params.productId}`);
        setProduct(response.metadata);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.productId) {
      fetchProduct();
    }
  }, [params.productId]); // Re-fetch when productId changes

  if (isLoading) {
    return <div className="text-center py-10">Đang tải sản phẩm...</div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-red-500">Sản phẩm không tồn tại!</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-start gap-2 min-h-screen">
      {/* Breadcrumb Component */}
      <div className="my-2">
        <BreadcrumbComponent links={["/shop"]} pageText={product.productName} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Product Gallery */}
        <ProductGallery isInModal={false} images={product.images || []} />

        {/* Product Details */}
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

// Export the component as default
export default ProductIdPage;
