import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User } from "@/lib/types/index";

interface UserDialogProps {
  isOpen: boolean;
  isCreateMode: boolean;
  user: User | null;
  onClose: () => void;
  onSave: () => void;
  onUserChange: (user: User) => void;
}

const UserDialog = ({
  isOpen,
  isCreateMode,
  user,
  onClose,
  onSave,
  onUserChange,
}: UserDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isCreateMode ? 'Thêm người dùng mới' : 'Chỉnh sửa thông tin người dùng'}
          </DialogTitle>
          <DialogDescription>
            {isCreateMode
              ? 'Điền thông tin để tạo tài khoản người dùng mới.'
              : 'Cập nhật thông tin và trạng thái tài khoản người dùng.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Họ tên
            </Label>
            <Input
              id="fullName"
              value={user.fullName}
              onChange={(e) => onUserChange({ ...user, fullName: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={user.email}
              onChange={(e) => onUserChange({ ...user, email: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Sdt
            </Label>
            <Input
              id="phone"
              value={user.phone || ''}
              onChange={(e) => onUserChange({ ...user, phone: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Vai trò
            </Label>
            <Select
              value={user.role}
              onValueChange={(value) => onUserChange({ ...user, role: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Khách hàng</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isActive" className="text-right">
              Trạng thái
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={user.isActive}
                onCheckedChange={(checked) => onUserChange({ ...user, isActive: checked })}
              />
              <Label htmlFor="isActive">
                {user.isActive ? 'Hoạt động' : 'Tạm khóa'}
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSave}>
            {isCreateMode ? 'Thêm người dùng' : 'Lưu thay đổi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;