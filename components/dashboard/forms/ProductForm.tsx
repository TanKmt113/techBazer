"use client";
import React, { useState, useEffect } from "react";
import { number, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import { api } from "@/utils/api";
import Image from "next/image";


const productSchema = z.object({
  productName: z.string().min(1, "Tên sản phẩm không được để trống"),
  price: z
    .string()
    .min(1, "Giá sản phẩm không được để trống")
    .default("0")
    .transform((val) => Number(val)),
  discount: z
    .string()
    .default("0")
    .transform((val) => Number(val)), 
  brand: z.string().min(1, "Thương hiệu không được để trống"),
  type: z.string(),
  description: z.string().optional(),
  genre: z.string().min(1, "Thể loại sản phẩm không được để trống"),
  color: z
    .string()
    .transform((val) =>
      val ? val.split(",").map((c) => c.trim()) : []
    ).optional(), 
  imagesLocal: z
    .custom<FileList>((val) => val instanceof FileList, "Vui lòng tải lên ảnh hợp lệ")
    .optional()
    .transform((fileList) => (fileList ? Array.from(fileList) : [])),
  images: z.array(z.string()).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

type ProductCardProps = {
  productData: Product | null;
};


const ProductForm = ({ productData }: ProductCardProps) => {

  const [categories, setCategories] = useState<{ _id: string; genreName: string }[]>([]);
  const [errorCategories, setErrorCategories] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get<any>('genres');
        setCategories(data.metadata);
      } catch (error) {
        console.error("Lỗi khi tải danh mục sản phẩm:", error);
        setErrorCategories("Không thể tải danh mục sản phẩm.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: productData?.productName || "",
      price: productData?.price || 0,
      discount: productData?.discount || 0,
      brand: productData?.brand || "",
      type: "featured",
      description: productData?.description || "",
      color: productData?.color || [],
      images: productData?.images || [],
    },
  });


  const onSubmit = async (payload: ProductFormData) => {
    const formData = new FormData();
    formData.append("items", JSON.stringify(payload));
    payload.imagesLocal.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });
  
    const data = productData?._id
      ? await api.pat<Product>('/product/' + productData?._id, formData)
      : await api.post<Product>('/product', formData);
  
    alert('Sản phẩm đã được tạo');
  };
  

  return (
    <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Cập nhật sản phẩm  {productData?.productName}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <div>
            <Label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Tên sản phẩm
            </Label>
            <Input
              id="productName"
              type="text"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              {...register("productName")}
            />
            {errors.productName && (
              <span className="text-red-500">{errors.productName.message}</span>
            )}
          </div>

          <div>
            <Label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Đơn giá
            </Label>
            <Input
              id="price"
              type="text"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              {...register("price")}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>

          <div>
            <Label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Giảm giá
            </Label>
            <Input
              id="discount"
              type="text"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              {...register("discount")}
            />
          </div>

          <div>
          <Label htmlFor="categorySlug">Thể loại</Label>
          {loadingCategories ? (
            <p className="text-gray-500">Đang tải danh mục...</p>
          ) : errorCategories ? (
            <p className="text-red-500">{errorCategories}</p>
          ) : (
            <select id="categorySlug" {...register("genre")} className="p-2 border rounded-md w-full" defaultValue={productData?.genre || ""}>
              <option value="" selected>Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.genreName}
                </option>
              ))}
            </select>
          )}
          {errors.genre && <span className="text-red-500">{errors.genre.message}</span>}
        </div>

          <div>
            <Label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Thương hiệu
            </Label>
            <Input
              id="brand"
              type="text"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              {...register("brand")}
            />
            {errors.brand && (
              <span className="text-red-500">{errors.brand.message}</span>
            )}
          </div>

          <div>
            <Label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Loại sản phẩm
            </Label>
            <select
              id="type"
              className="mt-1 block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              {...register("type")}
            >
              <option value="featured">✨ Nổi bật</option>
              <option value="top-rated">⭐ Đánh giá cao nhất</option>
              <option value="most-popular">🔥 Phổ biến nhất</option>
              <option value="new-arrivals">🆕 Hàng mới về</option>
            </select>
            {errors.type && (
              <span className="text-red-500">{errors.type.message}</span>
            )}
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Mô tả
            </Label>
            <textarea
              id="description"
              className="mt-1 p-2 block border bg-white dark:bg-slate-950 rounded-md w-full  border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Biến thể màu sắc
            </Label>
            <Input
              id="description"
              className="mt-1 p-2 block border dark:bg-slate-950 w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              {...register("color")}
            />
            {errors.color && (
              <span className="text-red-500">{errors.color.message}</span>
            )}
          </div>

          <div>
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Hình ảnh sản phẩm
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {productData?.images?.map((image: string, index: number) => (
                <div key={index} className="card">
                  <Image
                    src={image}
                    alt={productData?.productName || `Ảnh ${index + 1}`}
                    width={240}
                    height={240}
                    className="h-20 w-20 rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label
              htmlFor="imagesLocal"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Ảnh sản phẩm
            </Label>
            <p className="text-gray-500">
              Bạn có thể tải lên nhiều hình ảnh cho sản phẩm này.
            </p>
            <Input
              id="imagesLocal"
              type="file"
              multiple
              className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              {...register("imagesLocal")}
            />
            {errors.imagesLocal && (
              <span className="text-red-500">{errors.imagesLocal.message}</span>
            )}
          </div>

        </div>
        <div>
          <div>
            <Button type="submit">Lưu</Button>
          </div>
        </div>
      </form>
    </div>
  );
};


export default ProductForm;