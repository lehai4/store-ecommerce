import { apiConnect } from "@/api/apiConnect";
import { Category, Product } from "@/types/admin";
import { EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductsAdmin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [formEdit] = Form.useForm();
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [formUpload] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const columns: TableProps<Product>["columns"] = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      ellipsis: true,
      width: 200,
      align: "center",
      render: (_, record) => (
        <div className="flex flex-col items-center gap-2">
          {record.image && (
            <Image src={record.image} width={100} height={100} />
          )}
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => {
              setOpenUpload(true);
              formUpload.setFieldsValue({
                _id: record._id,
              });
            }}
          >
            Tải ảnh
          </Button>
        </div>
      ),
    },
    {
      title: "Tên",
      dataIndex: "nameProduct",
      key: "nameProduct",
      ellipsis: false,
      width: 200,
      align: "center",
    },
    {
      title: "Danh mục",
      dataIndex: "IDCategory",
      key: "IDCategory",
      ellipsis: true,
      width: 200,
      align: "center",
      filters: categories.map((category) => ({
        text: category.nameCategory,
        value: category._id,
      })),
      onFilter: (value, record) => {
        const category =
          categories &&
          categories.find((category) => category._id === record.IDCategory);
        return category
          ? category.nameCategory.includes(value as string)
          : false;
      },
      filterSearch: true,
      render: (_, record) => {
        const category = categories.find(
          (category) => category._id === record.IDCategory
        );
        return category?.nameCategory;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      ellipsis: true,
      width: 150,
      align: "center",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      ellipsis: true,
      width: 150,
      align: "center",
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "size",
      ellipsis: true,
      width: 150,
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: true,
      width: 120,
      align: "center",
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
                  nameProduct: record.nameProduct,
                  IDCategory: record.IDCategory,
                  price: record.price,
                  color: record.color,
                  size: record.size,
                  quantity: record.quantity,
                  image: record.image,
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

  const handleOk = async (values: Product) => {
    setIsSubmitting(true);
    try {
      await apiConnect.createProduct(values);
      toast.success("Thêm sản phẩm thành công");
      setOpen(false);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error("Thêm sản phẩm thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchProducts = async () => {
    const { data } = await apiConnect.getProducts();
    setProducts(data);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = async (values: Product) => {
    setIsUpdating(true);
    try {
      await apiConnect.updateProduct(values);
      toast.success("Sửa sản phẩm thành công");
      setOpenEdit(false);
      formEdit.resetFields();
      fetchProducts();
    } catch (error) {
      toast.error("Sửa sản phẩm thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSubmitting(true);
    try {
      await apiConnect.deleteProduct(id);
      toast.success("Xóa sản phẩm thành công");
      fetchProducts();
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("id", formUpload.getFieldValue("_id"));
      try {
        const { success } = await apiConnect.uploadImage(formData);
        if (success) {
          toast.success("Tải ảnh thành công");
          setOpenUpload(false);
          formUpload.resetFields();
          fetchProducts();
          setPreviewImage(null);
          setSelectedFile(null);
        } else {
          toast.error("Tải ảnh thất bại");
        }
      } catch (error) {
        toast.error("Tải ảnh thất bại");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await apiConnect.getProducts();
        const { data: categories } = await apiConnect.getCategories();
        setCategories(categories);
        setProducts(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
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
        <h2 className="text-2xl font-bold">Danh sách sản phẩm</h2>
        <Button type="primary" className="w-fit" onClick={() => setOpen(true)}>
          Thêm sản phẩm
        </Button>
        <Table
          columns={columns}
          dataSource={products.map((product) => ({
            ...product,
            key: product._id,
          }))}
          pagination={false}
          loading={loading}
          scroll={{ x: "100%", y: "100% " }}
          locale={{
            emptyText: <span>Không có dữ liệu</span>,
          }}
          bordered
        />
      </div>
      <Modal
        title="Thêm sản phẩm"
        open={open}
        footer={false}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleOk} form={form}>
          <Form.Item
            label="Tên"
            name="nameProduct"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="IDCategory"
            rules={[
              { required: true, message: "Danh mục không được để trống" },
            ]}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map((category) => (
                <Select.Option value={category._id} key={category._id}>
                  {category.nameCategory}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Giá không được để trống" }]}
          >
            <Input placeholder="Nhập giá" type="number" />
          </Form.Item>
          <Form.Item
            label="Màu sắc"
            name="color"
            rules={[{ required: true, message: "Màu sắc không được để trống" }]}
          >
            <Input placeholder="Nhập màu sắc" />
          </Form.Item>
          <Form.Item
            label="Kích cỡ"
            name="size"
            rules={[{ required: true, message: "Kích cỡ không được để trống" }]}
          >
            <Input placeholder="Nhập kích cỡ" />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: "Số lượng không được để trống" },
            ]}
          >
            <Input placeholder="Nhập số lượng" type="number" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="w-full"
            size="large"
            htmlType="submit"
          >
            Thêm sản phẩm
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
          <Form.Item label="Tên" name="nameProduct">
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item label="Danh mục" name="IDCategory">
            <Select placeholder="Chọn danh mục">
              {categories.map((category) => (
                <Select.Option value={category._id} key={category._id}>
                  {category.nameCategory}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Giá" name="price">
            <Input placeholder="Nhập giá" type="number" />
          </Form.Item>
          <Form.Item label="Màu sắc" name="color">
            <Input placeholder="Nhập màu sắc" />
          </Form.Item>
          <Form.Item label="Kích cỡ" name="size">
            <Input placeholder="Nhập kích cỡ" />
          </Form.Item>
          <Form.Item label="Số lượng" name="quantity">
            <Input placeholder="Nhập số lượng" type="number" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="w-full"
            size="large"
            htmlType="submit"
          >
            Sửa sản phẩm
          </Button>
        </Form>
      </Modal>

      {/* Modal tải ảnh */}
      <Modal
        title="Tải ảnh"
        open={openUpload}
        footer={false}
        onCancel={() => setOpenUpload(false)}
      >
        <Form layout="vertical" onFinish={handleUpload} form={formUpload}>
          <Form.Item label="Ảnh">
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Tải ảnh
          </Button>
        </Form>

        {/* Hiển thị ảnh */}
        {previewImage && (
          <div className="mt-4 flex flex-row gap-2">
            <Image src={previewImage} width={100} height={100} alt="Preview" />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductsAdmin;
