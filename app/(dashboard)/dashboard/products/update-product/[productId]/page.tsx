"use client";

import ProductForm from '@/components/dashboard/forms/ProductForm'
import BreadcrumbComponent from '@/components/others/Breadcrumb'
import { Product } from '@/types';
import { api } from '@/utils/api';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdateProductPage = () => {

  const { productId } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getByid = async (id: string) => {
      setLoading(true);
      try {
        const data = await api.get<any>(`/product/${id}`);
        setProduct(data.metadata);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (productId) {
      const id = Array.isArray(productId) ? productId[0] : productId;
      getByid(id);
    }
  }, [productId]);
  
  return (
    <div className='p-2 w-full'>
      <BreadcrumbComponent links={['/dashboard', '/products']} pageText='Cập nhật sản phẩm' />
      {product ? <ProductForm productData={product} /> : <p className='text-center mt-10'>Đang tải sản phẩm...</p>}
    </div>
  )
}

export default UpdateProductPage