'use client'
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Banner } from "@/types";

// Schema validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  discountText: z.string().min(1, "Description is required"),
  button: z.string().min(1, "Button text is required"),
  link: z.string().optional(),
  images: z.any().optional(),
});

// Định nghĩa type của form data
type FormValues = z.infer<typeof formSchema>;

// Props để nhận dữ liệu cập nhật
interface BannerFormProps {
  initialData?: Partial<FormValues>;
  onSubmitForm: (data: Banner) => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ initialData, onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  // Khi có dữ liệu initialData, cập nhật giá trị form
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof FormValues, initialData[key as keyof FormValues]);
      });
    }
  }, [initialData, setValue]);

  // Xử lý submit
  const onSubmit = (data: FormValues) => {

    
    const updateItem = {
      title: data.title,
      description: data.description,
      images: typeof data.images == "string" ? data.images.split(",") : data.images,
      button: data.button,
      discountText: data.discountText,
      link: data.link || ''
    }

    console.log(updateItem);
    
    onSubmitForm(updateItem);
  };

  return (
    <div className="max-w-screen-xl w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        {initialData ? "Cập nhật Banner" : "Thêm mới Banner"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input type="text" id="title" {...register("title")} />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Input type="text" id="description" {...register("description")} />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountText">Mô tả giảm giá</Label>
            <Input type="text" id="discountText" {...register("discountText")} />
            {errors.discountText && <span className="text-red-500 text-sm">{errors.discountText.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="button">Nội dung nút</Label>
            <Input type="text" id="button" {...register("button")} />
            {errors.button && <span className="text-red-500 text-sm">{errors.button.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Đường dẫn nút</Label>
            <Input type="text" id="link" {...register("link")} />
            {errors.link && <span className="text-red-500 text-sm">{errors.link.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Thêm link ảnh</Label>
            <Input type="text" id="images" {...register("images")} />
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-fit">
            {initialData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
