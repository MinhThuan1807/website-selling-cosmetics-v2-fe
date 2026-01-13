import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SettingsTab = () => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-inter text-foreground mt-3">
          Cài Đặt Tài Khoản
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-inter font-medium text-foreground">
            Đổi mật khẩu
          </h3>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label className="font-inter font-medium">
                Mật khẩu hiện tại
              </Label>
              <Input
                type="password"
                className="bg-input-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-inter font-medium">Mật khẩu mới</Label>
              <Input
                type="password"
                className="bg-input-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-inter font-medium">
                Xác nhận mật khẩu mới
              </Label>
              <Input
                type="password"
                className="bg-input-background border-border"
              />
            </div>
            <Button className="bg-brand-deep-pink hover:bg-brand-deep-pink/90 text-white font-poppins mb-3">
              Cập nhật mật khẩu
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};