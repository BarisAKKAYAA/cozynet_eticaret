import { useEffect, useState } from 'react'
import type { CustomerDTO } from '../../types/customer';
import axios, { AxiosError, type AxiosResponse } from 'axios';

function Customers() {

    const [customers, setCustomers] = useState<CustomerDTO[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  axios
    .get<CustomerDTO[]>("http://localhost:8080/api/admin/customers")
    .then((res: AxiosResponse<CustomerDTO[]>) => {
      setCustomers(res.data);
      setLoading(false);
    })
    .catch((err: AxiosError) => {
      console.error("Müşteri listesi yüklenemedi:", err);
      setLoading(false);
    });
}, []);

    if (loading) return <p>Yükleniyor...</p>;

    const handleDelete = async (id: number) => {
    if (!window.confirm("Bu müşteriyi silmek istediğinizden emin misiniz?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/customers/${id}`);
      setCustomers(customers.filter((p) => p.id !== id));
      alert("Müşteri başarıyla silindi!");
    } catch {
      alert("Müşteri silinirken bir hata oluştu!");
    }
  };



    return (
       
             <div className="container-fluid">
               <div className="mt-4">
                 <h4 className="text-center align-middle">MÜŞTERİLERİMİZ</h4>
                 <div className="table-responsive">
                   <table className="table table-striped table-bordered text-center align-middle">
                     <thead className="table-dark">
                       <tr>
                         <th>ID</th>
                         <th>İsim</th>
                         <th>Soyisim</th>
                         <th>Kullanıcı Adı</th>
                         <th>Email</th>
                         <th>Telefon</th>
                         <th>İşlem</th>
                       </tr>
                     </thead>
       
                     <tbody>
                       {customers.map((customers) => (
                         <tr key={customers.id}>
                           <td>{customers.id}</td>
                           <td>{customers.firstName}</td>
                           <td>{customers.lastName}</td>
                           <td>{customers.username}</td>
                           <td>{customers.email}</td>
                           <td>{customers.phone} ₺</td>
                           <td>    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(customers.id)}
                      >
                        Sil
                      </button> </td>
       
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
          
    )
}

export default Customers
