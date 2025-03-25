"use client";
import React, { useEffect, useState } from "react";
import CartItemsDetails from "./CartItemsDetails";
import { Separator } from "../ui/separator";
import useCartStore from "@/store/cartStore";
import { Button } from "../ui/button";
import Loader from "../others/Loader";
import { formatPrice } from "@/lib/formatPrice";

const OrderSummaryForCheckout = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { getTotalPrice, getTax, getShippingFee, getTotalAmount } =
    useCartStore();

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      {/* Đơn hàng đã đặt details */}
      <div>
        <h2 className="text-lg font-semibold my-2 lg:p-4">Đơn hàng</h2>
        <CartItemsDetails />
        <Separator className="dark:bg-white/50 mb-2" />
      </div>

      {/* order summary for order place */}
      <div className="lg:px-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Tổng quan đơn hàng
        </h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Tổng tiền hàng:</span>
          <span className="text-gray-900 dark:text-white">
            {formatPrice(getTotalPrice())} đ
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Tổng tiền vận chuyển:</span>
          <span className="text-gray-900 dark:text-white">
            {formatPrice(getShippingFee())} đ
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Tổng tiền thuế:</span>
          <span className="text-gray-900 dark:text-white">
            {formatPrice(getTax())} đ
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Thành tiền:
          </span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            {formatPrice(getTotalAmount())} đ
          </span>
        </div>
        <Button className="text-xl mt-6 bg-blue-500 dark:bg-blue-600 text-white py-6 px-12 hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none rounded-full hover:ring-2">
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryForCheckout;
