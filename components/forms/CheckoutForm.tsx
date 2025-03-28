'use client'
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Defined Zod schema for form validation
const schema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(8, "Phone is required"),
  city: z.string().min(3, "City is required"),
});

// Defined types for form data
type FormData = z.infer<typeof schema>;

const CheckoutForm: React.FC = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Họ & đệm</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Tên khách hàng</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            {...register("address")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              type="tel"
              id="phone"
              {...register("phone")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>
          <div>
            <Label htmlFor="city">Thành phố</Label>
            <Input
              id="city"
              {...register("city")}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
            />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
