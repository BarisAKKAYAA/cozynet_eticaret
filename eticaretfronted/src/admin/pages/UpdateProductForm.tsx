import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, message, Card, Divider, Space } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import type { CategoryDTO } from "../../types/category";
import type { ProductViewDTO } from "../../types/product";

const { Option } = Select;

interface Feature {
  color?: string;
  size?: string;
  material?: string;
}

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  sku?: string;
  image_url?: string;
  categoryId: number;
}

const UpdateProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [form] = Form.useForm<ProductFormValues>();

  // Kategorileri getir
  useEffect(() => {
    axios.get<CategoryDTO[]>("http://localhost:8080/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Ürün detayını getir
  useEffect(() => {
    if (!id) return;
    axios.get<ProductViewDTO>(`http://localhost:8080/api/admin/products/${id}`)
      .then(res => {
        const product = res.data;
        form.setFieldsValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          sku: product.sku,
          image_url: product.image_url,
          categoryId: product.categoryId,
        });
        setFeatures(product.features?.length ? product.features : [{ color: "", size: "", material: "" }]);
      })
      .catch(err => {
        console.error(err);
        message.error("Ürün yüklenemedi!");
      })
      .finally(() => setLoading(false));
  }, [id, form]);

  // Feature işlemleri
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  const updateFeature = (index: number, key: keyof Feature, value: string) => {
    const updated = [...features];
    updated[index][key] = value;
    setFeatures(updated);
  };

  // Submit
  const onFinish = async (values: ProductFormValues) => {
    setLoading(true);
    try {
      const filteredFeatures = features.filter(f => f.color || f.size || f.material);
      const payload = { ...values, features: filteredFeatures };

      await axios.put(`http://localhost:8080/api/admin/products/${id}`, payload);

      // Başarı mesajı
      message.success("Ürün başarıyla güncellendi!");
      navigate("/admin/products");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
        const backendMsg = err.response?.data?.message;
        message.error(backendMsg || "Ürün güncelleme başarısız!");
      } else {
        message.error("Ürün güncelleme başarısız!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <Card title="Ürün Güncelle" variant="outlined" style={{ maxWidth: 1200, margin: "20px auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Divider orientation="left">Ürün Bilgileri</Divider>

        <Form.Item name="name" label="Ürün Adı" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Açıklama" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="price" label="Fiyat" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="stock" label="Stok" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="sku" label="SKU">
          <Input />
        </Form.Item>

        <Form.Item name="image_url" label="Görsel URL">
          <Input />
        </Form.Item>

        <Form.Item name="categoryId" label="Kategori" rules={[{ required: true }]}>
          <Select placeholder="Kategori Seçin">
            {categories.map(cat => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Divider orientation="left">Ürün Özellikleri</Divider>

        {features.map((f, i) => (
          <Space key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <Input placeholder="Renk" value={f.color} onChange={e => updateFeature(i, "color", e.target.value)} />
            <Input placeholder="Boyut" value={f.size} onChange={e => updateFeature(i, "size", e.target.value)} />
            <Input placeholder="Malzeme" value={f.material} onChange={e => updateFeature(i, "material", e.target.value)} />
            <Button danger onClick={() => removeFeature(i)}>Sil</Button>
          </Space>
        ))}

     

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UpdateProductForm;
