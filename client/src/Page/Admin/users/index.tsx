import { Role, User } from "@/types/admin";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Switch,
} from "antd";
import { useEffect, useState } from "react";

import { apiConnect } from "@/api/apiConnect";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { toast } from "react-toastify";
const UsersAdmin = () => {
  const columns: TableProps<User>["columns"] = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      ellipsis: true,
      width: 100,
      render: (_, record) => {
        const role = roles.find((role) => role._id === record.roleId);
        return role?.nameRole;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      width: 150,
      render: (status: boolean) => {
        return status ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Không hoạt động</Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      ellipsis: true,
      width: 200,
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              className="w-fit"
              onClick={() => {
                setOpenEdit(true);
                formEdit.setFieldsValue({
                  _id: record._id,
                  name: record.name,
                  email: record.email,
                  phone: record.phone,
                  address: record.address,
                  roleId: record.roleId,
                  status: record.status,
                });
              }}
            >
              Sửa
            </Button>
            <Button
              type="primary"
              danger
              className="w-fit"
              onClick={() => handleDelete(record._id)}
            >
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [formEdit] = Form.useForm();

  const handleOk = async (values: User) => {
    setIsSubmitting(true);
    try {
      await apiConnect.createUser(values);
      toast.success("Thêm người dùng thành công");
      setOpen(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error("Thêm người dùng thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchUsers = async () => {
    const { data } = await apiConnect.getUsers();
    setUsers(data);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = async (values: User) => {
    setIsUpdating(true);
    try {
      await apiConnect.updateUser(values);
      toast.success("Sửa người dùng thành công");
      setOpenEdit(false);
      formEdit.resetFields();
      fetchUsers();
    } catch (error) {
      toast.error("Sửa người dùng thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSubmitting(true);
    try {
      await apiConnect.deleteUser(id);
      toast.success("Xóa người dùng thành công");
      fetchUsers();
    } catch (error) {
      toast.error("Xóa người dùng thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const [users, roles] = await Promise.all([
          apiConnect.getUsers(),
          apiConnect.getRoles(),
        ]);
        const { data } = users;
        setUsers(data);
        const { data: rolesData } = roles;
        setRoles(rolesData);
      } catch (error) {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-2xl font-bold">Lỗi khi tải dữ liệu</div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md h-full w-full border-gray-200 overflow-hidden">
      {(isUpdating || isSubmitting) && (
        <div
          className="fixed top-0 start-0 w-full h-full flex justify-center items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div
            className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"
            role="status"
          ></div>
          <span className="visually-hidden text-white">Loading...</span>
        </div>
      )}

      <div className="flex flex-col gap-4 h-full">
        <h2 className="text-2xl font-bold">Danh sách người dùng</h2>
        <Button type="primary" className="w-fit" onClick={() => setOpen(true)}>
          Thêm người dùng
        </Button>
        <Table
          columns={columns}
          dataSource={users}
          pagination={false}
          loading={loading}
          scroll={{ x: "100%", y: 55 * 5 }}
          locale={{
            emptyText: <span>Không có dữ liệu</span>,
          }}
        />
      </div>
      <Modal
        title="Thêm người dùng"
        open={open}
        footer={false}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleOk} form={form}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Email không hợp lệ" },
              { required: true, message: "Email không được để trống" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Địa chỉ không được để trống" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            label="Vai trò"
            name="roleId"
            rules={[{ required: true, message: "Vai trò không được để trống" }]}
          >
            <Select placeholder="Chọn vai trò">
              {roles.map((role) => (
                <Select.Option value={role._id} key={role._id}>
                  {role.nameRole}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="w-full"
            size="large"
            htmlType="submit"
          >
            Thêm người dùng
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Sửa người dùng"
        open={openEdit}
        footer={false}
        onCancel={handleCancelEdit}
      >
        <Form layout="vertical" onFinish={handleEdit} form={formEdit}>
          <Form.Item label="ID" name="_id" hidden>
            <Input placeholder="ID" />
          </Form.Item>
          <Form.Item label="Tên" name="name">
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item label="Vai trò" name="roleId">
            <Select placeholder="Chọn vai trò">
              {roles.map((role) => (
                <Select.Option value={role._id} key={role._id}>
                  {role.nameRole}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Trạng thái" name="status" valuePropName="checked">
            <Switch
              checked={formEdit.getFieldValue("status")}
              onChange={(checked) => {
                formEdit.setFieldsValue({ status: checked });
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="w-full"
            size="large"
            htmlType="submit"
          >
            Sửa người dùng
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersAdmin;
