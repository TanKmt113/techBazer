"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Thay useRouter bằng useParams
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetails from "@/components/product/ProductDetails";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import { api } from "@/utils/api";
import { Loader } from "lucide-react";

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {

     const getByid=async (id:string)=>{
      setLoading(true);
      const data = await api.get<any>(`/product/${id}`);
      setProduct(data);
      setLoading(false);

    }
    if (productId) {
      const id = Array.isArray(productId) ? productId[0] : productId;
      getByid(id);

    }
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 text-center text-gray-600">
         <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-screen-xl mx-auto p-8 text-center text-gray-600">
        <p>Sản phẩm không tồn tại.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="py-2">
        <BreadcrumbComponent
          links={["/dashboard", "/products"]}
          pageText={product.title}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-8">
        {/* Product Gallery */}
        <ProductGallery isInModal={false} images={product.images || []} />
        {/* Product Details */}
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
