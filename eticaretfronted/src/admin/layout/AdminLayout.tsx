import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  OrderedListOutlined
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div style={{ color: "white", padding: "20px", fontSize: "20px" }}>
          Admin Panel
        </div>

        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<ShoppingOutlined />}>
            <Link to="/admin/products">Ürünler</Link>
          </Menu.Item>

          <Menu.Item key="3" icon={<OrderedListOutlined />}>
            <Link to="/admin/customers">Müşteriler</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/admin/reviews">Yorumlar</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "20px" }}>
          <Outlet />  {/* ÇOCUK ROUTE'LAR BURAYA GELECEK */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
