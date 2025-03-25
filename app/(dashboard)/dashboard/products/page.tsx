"use client";

import ProductActions from "@/components/dashboard/product/ProductActions";
import ProductHeader from "@/components/dashboard/product/ProductHeader";
import Loader from "@/components/others/Loader";
import Pagination from "@/components/others/Pagination";
import Image from "next/image";
import React, { useEffect, useState, Suspense } from "react";
import { Product } from "@/types";
import { useApiClient } from "@/utils/apiClient";


const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { get } = useApiClient();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get<any>("/products?skip=0&limit=30");
        setProducts(data.metadata.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
      <ProductHeader />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-x-scroll divide-y divide-gray-200 dark:divide-gray-700 border dark:border-gray-500">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ảnh sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thể loại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products?.map((product) => (
                <tr key={product._id} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Image
                      src={product.images[0] || "/placeholder.png"}
                      alt={product.productName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.productName.slice(0, 30)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.brand? product.brand.brandName : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ProductActions  id={product._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Suspense fallback={<Loader />}>
        <Pagination totalPages={10} currentPage={1} pageName="productpage" />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
