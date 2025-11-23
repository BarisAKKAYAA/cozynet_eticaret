import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, message, Card, Divider, Space } from "antd";
import axios from "axios";
import type { CategoryDTO } from "../../types/category";

const { Option } = Select;

interface ProductFormValues {
    name: string;
    description: string;
    price: number;
    stock: number;
    sku?: string;
    image_url?: string;
    categoryId: number;
}

interface Feature {
    color?: string;
    size?: string;
    material?: string;
}

const AddProductForm: React.FC = () => {
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState<Feature[]>([
        { color: "", size: "", material: "" }
    ]);

    useEffect(() => {
        axios
            .get<CategoryDTO[]>("http://localhost:8080/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
    const updateFeature = (index: number, key: keyof Feature, value: string) => {
        const updated = [...features];
        updated[index][key] = value;
        setFeatures(updated);
    };

    const onFinish = async (values: ProductFormValues) => {
        try {
            setLoading(true);

            const filteredFeatures = features.filter(f => f.color || f.size || f.material);

            const payload = {
                ...values,
                features: filteredFeatures
            };

            await axios.post("http://localhost:8080/api/admin/products", payload);

            message.success("Ürün başarıyla eklendi!");
        } catch (err) {
            console.error(err);
            message.error("Ürün ekleme başarısız!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            title="Yeni Ürün Ekle"
            bordered={false}
            style={{ maxWidth: 1200, margin: "0 auto", marginTop: 20 }}
        >
            <Form layout="vertical" onFinish={onFinish}>
                <Divider orientation="left">Ürün Bilgileri</Divider>

                <Form.Item name="name" label="Ürün Adı" rules={[{ required: true }]}>
                    <Input placeholder="Örn: Koltuk Takımı" />
                </Form.Item>

                <Form.Item name="description" label="Açıklama" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} placeholder="Ürün açıklaması..." />
                </Form.Item>

                <Form.Item name="price" label="Fiyat" rules={[{ required: true }]}>
                    <InputNumber style={{ width: "100%" }} min={0} placeholder="0.00" />
                </Form.Item>

                <Form.Item name="stock" label="Stok" rules={[{ required: true }]}>
                    <InputNumber style={{ width: "100%" }} min={0} placeholder="0" />
                </Form.Item>

                <Form.Item name="sku" label="SKU">
                    <Input placeholder="Örn: SKU100" />
                </Form.Item>

                <Form.Item name="imageUrl" label="Görsel URL">
                    <Input placeholder="https://..." />
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
                    <Space
                        key={i}
                        style={{
                            marginBottom: 12,
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                        align="start"
                    >
                        <Input
                            placeholder="Renk"
                            value={f.color}
                            onChange={e => updateFeature(i, "color", e.target.value)}
                        />
                        <Input
                            placeholder="Boyut"
                            value={f.size}
                            onChange={e => updateFeature(i, "size", e.target.value)}
                        />
                        <Input
                            placeholder="Malzeme"
                            value={f.material}
                            onChange={e => updateFeature(i, "material", e.target.value)}
                        />
                        <Button danger onClick={() => removeFeature(i)}>
                            Sil
                        </Button>
                    </Space>
                ))}

               

                <Form.Item style={{ marginTop: 20 }}>
                    <Button type="primary" htmlType="submit" loading={loading} block size="large">
                        Ürünü Ekle
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AddProductForm;
