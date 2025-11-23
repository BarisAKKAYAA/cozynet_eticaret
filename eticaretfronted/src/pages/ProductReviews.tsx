import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import type { Review, ProductReviewsProps } from "../types/review";
import { AppContext } from "../context/AppContext";



const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  reviewsPerPage = 5,
  initialReviews = [],
}) => {
  const { isLoggedIn, customer } = useContext(AppContext);

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Backend’den yorumları çek
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/reviews/product/${productId}`)
      .then((res) => {
        // customerName → username olarak maple
        const mapped: Review[] = res.data.map((r: Review) => ({
          id: r.id,
          username: r.customerName,
          rating: r.rating,
          comment: r.comment,
          reviewDate: r.reviewDate,
        }));

        setReviews(mapped);
      })
      .catch(() => setError("Yorumlar yüklenemedi!"))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !customer) {
      alert("Yorum eklemek için giriş yapmalısınız!");
      return;
    }
    if (!comment || rating === 0) {
      alert("Lütfen yorum ve yıldız seçin!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/reviews/customer/${customer.id}/product/${productId}`,
        { comment, rating }
      );

      const newReview: Review = {
        id: res.data.id,
        username: res.data.customerName, // backend’den gelen customerName
        rating: res.data.rating,
        comment: res.data.comment,
        reviewDate: res.data.reviewDate,
        customerId: 0,
        customerName: "",
        productId: 0
      };

      setReviews([newReview, ...reviews]);
      setComment("");
      setRating(5);
      setHoverRating(0);
      setCurrentPage(1);
    } catch {
      alert("Yorum eklenemedi!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Yorumlar yükleniyor...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="mt-5">
      <h3 className="mb-3">Yorumlar ({reviews.length})</h3>

      {isLoggedIn && (
        <div className="card p-3 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`me-1 fs-4 cursor-pointer ${star <= (hoverRating || rating) ? "text-warning" : "text-secondary"
                    }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Yorumunuzu yazın"
              className="form-control mb-2"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-success"
            >
              {submitting ? "Gönderiliyor..." : "Yorum Ekle"}
            </button>
          </form>
        </div>
      )}

      {!isLoggedIn && <p className="text-muted">Yorum eklemek için giriş yapmalısınız.</p>}

      <ul className="list-unstyled">
        {currentReviews.map((r) => (
          <li key={r.id} className="card p-2 mb-2">
            <div className="d-flex justify-content-between">
              <strong>{r.username}</strong>
              <span className="text-warning">{"★".repeat(r.rating)}</span>
            </div>
            <p>{r.comment}</p>
            <small className="text-muted">
              {new Date(r.reviewDate).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Önceki
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
