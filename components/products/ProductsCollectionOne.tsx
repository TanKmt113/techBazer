"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import SingleProductCartView from "../product/SingleProductCartView";
import { useApiClient } from "@/utils/apiClient";
import { Product } from "@/types";

const ProductsCollectionOne = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { get, post } = useApiClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);


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


  if (!isMounted) {
    return null;
  }

  return (
    <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
      <Tabs defaultValue="top-rated" className="w-full space-y-8 mx-0">
        <div className="flex items-center flex-col md:flex-row justify-between gap-2 flex-wrap w-full">
          <h2 className="text-3xl md:text-5xl font-semibold border-l-4 border-l-rose-500 p-2">
            Sản phẩm nổi bật
          </h2>
          <TabsList className="font-semibold bg-transparent text-center">
            <TabsTrigger value="top-rated" className="md:text-xl">
              Đánh giá cao nhất
            </TabsTrigger>
            <TabsTrigger value="most-popular" className="md:text-xl">
              Phổ biến nhất
            </TabsTrigger>
            <TabsTrigger value="new-items" className="md:text-xl">
              Sản phẩm mới
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="top-rated" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {products?.slice(0, 8)?.map((product) => {
              return (
                <SingleProductCartView key={product._id} product={product} />
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="most-popular">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.slice(0, 8)?.map((product) => {
              return (
                <SingleProductCartView key={product._id} product={product} />
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="new-items">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.slice(0, 8)?.map((product) => {
              return (
                <SingleProductCartView key={product._id} product={product} />
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductsCollectionOne;
