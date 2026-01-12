"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const COSMETIC_DETAILS = {
  description:
    "Son dưỡng môi với chiết xuất từ thiên nhiên, phù hợp cho mọi loại da. Công thức độc đáo giúp dưỡng ẩm và bảo vệ môi khỏi khô nẻ.",
  ingredients: [
    "Dầu dừa hữu cơ",
    "Sáp ong tự nhiên",
    "Vitamin E",
    "Chiết xuất hoa hồng",
    "Dầu jojoba",
  ],
  usage: [
    "Làm sạch môi trước khi sử dụng",
    "Thoa đều một lớp mỏng lên môi",
    "Có thể sử dụng nhiều lần trong ngày",
    "Bảo quản nơi khô ráo, thoáng mát",
  ],
  returnPolicy: [
    "Đổi trả trong vòng 30 ngày",
    "Sản phẩm còn nguyên vẹn, chưa sử dụng",
    "Có hóa đơn mua hàng",
    "Liên hệ hotline để được hỗ trợ",
  ],
};

const ProductDetails = () => {
  return (
    <div className="mt-16">
      <Card className="border-border">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ingredients">
              <AccordionTrigger className="font-inter font-medium text-foreground">
                Thành phần
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {COSMETIC_DETAILS.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-brand-gold mt-2">•</span>
                      <span className="text-muted-foreground font-inter">
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="usage">
              <AccordionTrigger className="font-inter font-medium text-foreground">
                Hướng dẫn sử dụng
              </AccordionTrigger>
              <AccordionContent>
                <ol className="space-y-2">
                  {COSMETIC_DETAILS.usage.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-brand-deep-pink font-poppins font-medium mt-1">
                        {index + 1}.
                      </span>
                      <span className="text-muted-foreground font-inter">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="return-policy">
              <AccordionTrigger className="font-inter font-medium text-foreground">
                Chính sách đổi trả
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {COSMETIC_DETAILS.returnPolicy.map((policy, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-brand-gold mt-2">•</span>
                      <span className="text-muted-foreground font-inter">
                        {policy}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;