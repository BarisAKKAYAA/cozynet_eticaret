import React, { useEffect, useState } from "react";
import axios from "axios";
import CargoTable from "../components/CargoTable";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="col-xl-3 col-md-6">
      <div className={`card-lg card`}>
        <div className="d-flex flex-column gap-8 card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold">{title}</div>
            </div>
            <div>{icon}</div>
          </div>
          <div className="lh-1 d-flex flex-column gap-3">
            <div className="fs-1 fw-bold">{value}</div>
          
          </div>
        </div>
      </div>
    </div>
  );
};







const Dashboard: React.FC = () => {
  

   const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomer: 0,
    totalSiteReview: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard API Error:", err));
  }, []);





  const cards = [
    {
      title: "Toplam Sipariş",
      value: stats.totalOrders,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-briefcase"
        >
          <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
          <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
          <path d="M12 12l0 .01"></path>
          <path d="M3 13a20 20 0 0 0 18 0"></path>
        </svg>
      ),
    },
    {
      title: "Ürün Sayısı",
      value: stats.totalProducts,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-list-check"
        >
          <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
          <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
          <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
          <path d="M11 6l9 0"></path>
          <path d="M11 12l9 0"></path>
          <path d="M11 18l9 0"></path>
        </svg>
      ),
    },
    {
      title: "Kullanıcı",
      value: stats.totalCustomer,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-users"
        >
          <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
        </svg>
      ),
    },
    {
      title: "Yorum Sayısı",
      value: stats.totalSiteReview,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-snowboarding"
        >
          <path d="M15 3a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
          <path d="M7 19l4 -2.5l-.5 -1.5"></path>
          <path d="M16 21l-1 -6l-4.5 -3l3.5 -6"></path>
          <path d="M7 9l1.5 -3h5.5l2 4l3 1"></path>
          <path d="M3 17c.399 1.154 .899 1.805 1.5 1.951c6 1.464 10.772 2.262 13.5 2.927c1.333 .325 2.333 0 3 -.976"></path>
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="g-6 mb-6 row">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      <CargoTable />
    </div>
  );
};

export default Dashboard;
