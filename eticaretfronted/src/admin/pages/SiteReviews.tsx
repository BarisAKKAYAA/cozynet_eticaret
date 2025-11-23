import { useEffect, useState } from 'react'
import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { Review } from '../../types/review';

function SiteReviews() {

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Review[]>("http://localhost:8080/api/admin/sitereviews")
      .then((res: AxiosResponse<Review[]>) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.error("Müşteri Yorum listesi yüklenemedi:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu yorumu silmek istediğinizden emin misiniz?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/sitereviews/${id}`);
      setReviews(reviews.filter((p) => p.id !== id));
      alert("Yorım başarıyla silindi!");
    } catch {
      alert("Yorum silinirken bir hata oluştu!");
    }
  };



  return (

    <div className="container-fluid">
      <div className="mt-4">
        <h4 className="text-center align-middle">MÜŞTERİ YORUMLARI</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Kullanıcı Adı</th>
                <th>Müşteri Yorumu</th>
                <th>İşlem</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((reviews) => (
                <tr key={reviews.id}>
                  <td>{reviews.id}</td>
                  <td>{reviews.customerName}</td>
                  <td>{reviews.comment}</td>
                  <td>    <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(reviews.id)}
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

export default SiteReviews
