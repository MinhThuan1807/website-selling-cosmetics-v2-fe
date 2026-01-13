"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {
  fetchCurrentUser,
  selectCurrentUser,
  selectUserLoading,
  logoutUserApi,
} from "@/lib/redux/user/userSlice";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { User, Package, Settings, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  fetchUserOrders,
  selectOrders,
} from "@/lib/redux/order/orderSlice";
import { Order } from "@/lib/types";
import { orderApi } from "@/lib/api/order";
import { toast } from "sonner";
import { ProfileTab } from "./components/ProfileTab";
import { OrdersTab } from "./components/OrdersTab";
import { CancelOrderDialog } from "./components/CancelOrderDialog";
import { OrderStatusProgress } from "./components/OrderStatusProgress";
import { SettingsTab } from "./components/SettingsTab";
import { OrderDetailDialog } from "./components/OrderDetailDialog";
import { OrderTable } from "./components/OrderTable";
import { OrderMobileCard } from "./components/OrderMobileCard";

const UserAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectUserLoading);
  const orders = useSelector(selectOrders);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const handleLogout = async () => {
    await dispatch(logoutUserApi());
    router.push("/");
  };

  const handleDeleteOrder = async (_id: string) => {
    setOrderToCancel(_id);
    setShowCancelDialog(true);
  };

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;
    try {
      await orderApi.cancelOrder(orderToCancel);
      toast.success("Đã hủy đơn hàng");
      setShowCancelDialog(false);
      setOrderToCancel(null);
      dispatch(fetchUserOrders());
    } catch (err) {
      toast.error("Hủy đơn hàng thất bại. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Vui lòng đăng nhập để xem thông tin</p>
        <Button onClick={() => router.push("/users/login")} className="mt-4">
          Đăng nhập
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CancelOrderDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={confirmCancelOrder}
      />

      <div className="flex items-center justify-between mb-8">
        <h1 className="font-inter text-foreground">Tài Khoản Của Bạn</h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-destructive text-destructive hover:bg-destructive hover:text-white font-poppins"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="font-poppins">
            <User className="h-4 w-4 mr-2" />
            Thông tin cá nhân
          </TabsTrigger>
          <TabsTrigger value="orders" className="font-poppins">
            <Package className="h-4 w-4 mr-2" />
            Lịch sử đơn hàng
          </TabsTrigger>
          <TabsTrigger value="settings" className="font-poppins">
            <Settings className="h-4 w-4 mr-2" />
            Cài đặt
          </TabsTrigger>
        </TabsList>

        <TabsContents className="w-full">
          <TabsContent value="profile">
            <ProfileTab user={currentUser} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab
              orders={orders}
              onViewDetails={handleViewDetails}
              onCancelOrder={handleDeleteOrder}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </TabsContents>
      </Tabs>

      <OrderDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        order={selectedOrder}
        username={currentUser.username}
      />
    </div>
  );
};

export default UserAccount;