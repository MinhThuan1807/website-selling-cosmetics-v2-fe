"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types/index";
import { AppDispatch } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  selectAllUsers,
  selectUserPagination,
  getAllUsersWithPagination,
  fetchALlUsers,
} from "@/lib/redux/user/userSlice";

import UserFilters from "./components/UserFilters";
import UserTable from "./components/UserTable";
import UserDialog from "./components/UserDialog";
import UserPagination from "./components/UserPagination";

const UsersManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUsers);
  const pagination = useSelector(selectUserPagination);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Fetch users with pagination
  useEffect(() => {
    dispatch(
      getAllUsersWithPagination({
        page: currentPage,
        limit: pageSize,
        sortBy: "createdAt",
        sortOrder: "desc",
      })
    );
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    dispatch(fetchALlUsers());
  }, [dispatch]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const createEmptyUser = (): User => ({
    _id: "",
    email: "",
    username: "",
    fullName: "",
    role: "customer",
    isActive: true,
    phone: "",
    gender: "",
    dob: new Date(),
    avatar: "",
    createdAt: new Date(),
  });

  const handleCreateUser = useCallback(() => {
    setSelectedUser(createEmptyUser());
    setIsCreateDialogOpen(true);
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  }, []);

  const handleDeleteUser = useCallback(
    async (userId: string) => {
      if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        await dispatch(deleteUser(userId));
      }
    },
    [dispatch]
  );

  const handleSaveUser = useCallback(async () => {
    if (selectedUser) {
      if (isCreateDialogOpen) {
        // TODO: Implement create user API call
        setIsCreateDialogOpen(false);
      } else {
        // TODO: Implement update user API call
        setIsEditDialogOpen(false);
      }
      setSelectedUser(null);
    }
  }, [selectedUser, isCreateDialogOpen]);

  const handleToggleStatus = useCallback((userId: string) => {
    // TODO: Implement toggle status API call
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsEditDialogOpen(false);
    setIsCreateDialogOpen(false);
    setSelectedUser(null);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="pt-2">Quản lý tài khoản người dùng</CardTitle>
          <CardDescription>
            Quản lý thông tin và trạng thái tài khoản của khách hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onCreateUser={handleCreateUser}
          />

          <UserTable
            users={filteredUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
          />

          <UserPagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            totalCount={pagination.totalCount}
            filteredCount={filteredUsers.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </CardContent>
      </Card>

      <UserDialog
        isOpen={isEditDialogOpen || isCreateDialogOpen}
        isCreateMode={isCreateDialogOpen}
        user={selectedUser}
        onClose={handleDialogClose}
        onSave={handleSaveUser}
        onUserChange={setSelectedUser}
      />
    </div>
  );
};

export default UsersManagement;