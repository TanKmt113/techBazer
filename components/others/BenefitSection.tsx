import React from "react";
import { Truck, RefreshCcw, DollarSign, Users } from "lucide-react";

const BenefitsSection = ({ textCenter }: { textCenter: boolean }) => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {!textCenter ? (
          <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
            <h2 className="text-3xl md:text-5xl !text-center md:text-start font-bold  text-gray-900 dark:text-white border-l-4 p-2 border-l-rose-500 ">
              Khám phá những lợi thế của chúng tôi
            </h2>
          </div>
        ) : (
          <h2 className="text-3xl md:text-5xl font-bold text-start md:text-center text-gray-900 dark:text-white mb-12 border-l-4  border-l-rose-500 w-fit mx-auto p-2">
            Khám phá những lợi thế của chúng tôi
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <Truck size={48} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Miễn phí vận chuyển
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Tận hưởng Miễn phí vận chuyển cho mọi đơn hàng chỉ cần mua hàng tối thiểu.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <RefreshCcw size={48} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Trả hàng dễ dàng
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
            Trả lại bất kỳ mặt hàng nào trong vòng 30 ngày để được hoàn lại toàn bộ tiền, không cần hỏi bất kỳ câu hỏi nào.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <DollarSign size={48} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Giá tốt nhất
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
            Mua sắm một cách tự tin khi biết rằng bạn sẽ nhận được mức giá tốt nhất
            được đảm bảo.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <Users size={48} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Hỗ trợ 24/7
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
            Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng hỗ trợ
            bạn 24/7.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
