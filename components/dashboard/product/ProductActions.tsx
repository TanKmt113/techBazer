import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useApiClient } from "@/utils/apiClient";

interface ProductProps {
  id: string;
}
const ProductActions = ({ id }: ProductProps) => {

  const { del } = useApiClient();

  const deleteProduct = async (id:string)=>{
      const res = await del(`/products/${id}`);
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger className="">
          <div className="flex items-center justify-center hover:bg-slate-200 p-2 rounded-full dark:hover:bg-slate-900 duration-200">
            <MoreHorizontal />
          </div>
        </PopoverTrigger>
        <PopoverContent className="text-start">
        <Link
            href={`/dashboard/products/${id}`}
            className="py-2 px-4 rounded-md w-full  block hover:bg-slate-200 dark:hover:bg-slate-900"
          >
            Xem chi tiết
          </Link>
          <Link
            href={`/dashboard/products/update-product/${id}`}
            className="py-2 px-4 rounded-md w-full  block hover:bg-slate-200 dark:hover:bg-slate-900"
          >
           Cập nhật sản phẩm
          </Link>
          <button className="w-full text-start hover:bg-slate-200 dark:hover:bg-slate-900 py-2 px-4 rounded-md" onClick={() => deleteProduct(id)}>
            Xóa sản phẩm
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProductActions;
