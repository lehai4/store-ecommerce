import { EditOutlined } from "@ant-design/icons";

import { Input, Modal } from "antd";

import { Form, Table } from "antd";

import { Button } from "antd";

import { apiConnect } from "@/api/apiConnect";
import { Category } from "@/types/admin";
import { PlusOutlined } from "@ant-design/icons";
import { Space, TableProps } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CategoriesAdmin = () => {
  const columns: TableProps<Category>["columns"] = [
    {
      title: "Tên",
      dataIndex: "nameCategory",
      key: "nameCategory",
      ellipsis: true,
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
                  nameCategory: record.nameCategory,
                  description: record.description,
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

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [formEdit] = Form.useForm();

  const handleOk = async (values: Category) => {
    setIsSubmitting(true);
    try {
      await apiConnect.createCategory(values);
      toast.success("Thêm danh mục thành công");
      setOpen(false);
      form.resetFields();
      fetchCategories();
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error("Thêm danh mục thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchCategories = async () => {
    const { data } = await apiConnect.getCategories();
    setCategories(data);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = async (values: Category) => {
    setIsUpdating(true);
    try {
      await apiConnect.updateCategory(values);
      toast.success("Sửa danh mục thành công");
      setOpenEdit(false);
      formEdit.resetFields();
      fetchCategories();
    } catch (error) {
      toast.error("Sửa danh mục thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSubmitting(true);
    try {
      await apiConnect.deleteCategory(id);
      toast.success("Xóa danh mục thành công");
      fetchCategories();
    } catch (error) {
      toast.error("Xóa danh mục thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await apiConnect.getCategories();
        setCategories(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold text-red-500">
          <div className="flex flex-row flex-wrap gap-4">
            <div className="text-2xl font-bold text-red-500">
              Lỗi khi tải dữ liệu!
            </div>
            <Button type="primary" onClick={() => window.location.reload()}>
              Tải lại trang
            </Button>
          </div>
        </div>
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
        <h2 className="text-2xl font-bold">Danh sách loại sản phẩm</h2>
        <Button type="primary" className="w-fit" onClick={() => setOpen(true)}>
          Thêm danh mục
        </Button>
        <Table
          columns={columns}
          dataSource={categories.map((category) => ({
            ...category,
            key: category._id,
          }))}
          pagination={false}
          loading={loading}
          scroll={{ x: "100%", y: "100% " }}
          locale={{
            emptyText: <span>Không có dữ liệu</span>,
          }}
        />
      </div>
      <Modal
        title="Thêm danh mục"
        open={open}
        footer={false}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleOk} form={form}>
          <Form.Item
            label="Tên"
            name="nameCategory"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="w-full"
            size="large"
            htmlType="submit"
          >
            Thêm danh mục
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Sửa danh mục"
        open={openEdit}
        footer={false}
        onCancel={handleCancelEdit}
      >
        <Form layout="vertical" onFinish={handleEdit} form={formEdit}>
          <Form.Item label="ID" name="_id" hidden>
            <Input placeholder="ID" />
          </Form.Item>
          <Form.Item label="Tên" name="nameCategory">
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="w-full"
            size="large"
            htmlType="submit"
          >
            Sửa danh mục
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesAdmin;
