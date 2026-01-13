import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface User {
  fullName: string;
  username: string;
  email: string;
  phone?: string;
}

interface ProfileTabProps {
  user: User;
}

export const ProfileTab = ({ user }: ProfileTabProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-inter text-foreground mt-3">
          Thông Tin Cá Nhân
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-brand-pink text-foreground font-poppins text-lg">
              {user?.fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            className="border-brand-pink text-brand-deep-pink hover:bg-brand-pink font-poppins"
          >
            Thay đổi ảnh đại diện
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-inter font-medium">Họ và tên</Label>
            <Input
              value={user?.fullName || ""}
              className="bg-input-background border-border"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label className="font-inter font-medium">Tên đăng nhập</Label>
            <Input
              value={user.username || ""}
              className="bg-input-background border-border"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label className="font-inter font-medium">Email</Label>
            <Input
              value={user.email || ""}
              className="bg-input-background border-border"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label className="font-inter font-medium">Số điện thoại</Label>
            <Input
              value={user?.phone || ""}
              className="bg-input-background border-border"
              disabled
            />
          </div>
        </div>

        <Button className="bg-brand-deep-pink hover:bg-brand-deep-pink/90 text-white font-poppins mb-3">
          Cập nhật thông tin
        </Button>
      </CardContent>
    </Card>
  );
};