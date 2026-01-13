import { CheckCircle, Clock, PackageCheck, Truck, XCircle } from "lucide-react";
import { Order } from "@/lib/types";

interface OrderStatusProgressProps {
  status: Order["status"];
}

export const OrderStatusProgress = ({ status }: OrderStatusProgressProps) => {
  const steps = [
    { key: "pending", label: "Chờ xử lý", icon: Clock },
    { key: "processing", label: "Đang xử lý", icon: Truck },
    { key: "completed", label: "Hoàn thành", icon: PackageCheck },
  ];

  const cancelledSteps = [
    { key: "cancelled", label: "Đã hủy", icon: XCircle },
  ];

  const currentSteps = status === "cancelled" ? cancelledSteps : steps;

  const getStepStatus = (stepKey: string) => {
    if (status === "cancelled") {
      return stepKey === "cancelled" ? "completed" : "upcoming";
    }

    const statusOrder = ["pending", "processing", "completed"];
    const currentIndex = statusOrder.indexOf(status);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="py-6">
      <div className="relative">
        {/* Progress Line */}
        {status !== "cancelled" && (
          <div className="absolute top-5 left-0 w-full h-0.5 bg-muted">
            <div
              className="h-full bg-brand-deep-pink transition-all duration-500"
              style={{
                width:
                  status === "pending"
                    ? "0%"
                    : status === "processing"
                    ? "50%"
                    : "100%",
              }}
            />
          </div>
        )}

        {/* Steps */}
        <div
          className={`relative flex ${
            status === "cancelled" ? "justify-center" : "justify-between"
          }`}
        >
          {currentSteps.map((step) => {
            const stepStatus = getStepStatus(step.key);
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${
                      stepStatus === "completed"
                        ? "bg-brand-deep-pink border-brand-deep-pink text-white"
                        : stepStatus === "current"
                        ? "bg-white border-brand-deep-pink text-brand-deep-pink"
                        : "bg-white border-muted text-muted-foreground"
                    }
                    ${
                      status === "cancelled"
                        ? "border-destructive bg-destructive text-white"
                        : ""
                    }
                  `}
                >
                  {stepStatus === "completed" && status !== "cancelled" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <p
                  className={`
                    mt-2 text-sm font-medium text-center
                    ${
                      stepStatus === "completed" || stepStatus === "current"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                    ${status === "cancelled" ? "text-destructive" : ""}
                  `}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};