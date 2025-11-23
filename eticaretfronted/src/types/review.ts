export interface Review {
  id: number;          // Yorumun benzersiz ID'si
  username: string;    // Yorum yapan kullanıcının adı
  rating: number;      // Kullanıcının verdiği puan (örn. 1-5)
  comment: string;     // Yorum metni
  reviewDate: string;   // Yorumun oluşturulma tarihi
  customerId: number;
  customerName: string;
  productId: number;
}

export interface ProductReviewsProps {
  productId: number | string;       // Hangi ürünün yorumları gösterilecek, ürün ID'si. Sayı veya string olabilir.
  reviewsPerPage?: number;          // Sayfa başına gösterilecek yorum sayısı (opsiyonel, ? işareti ile belirtilmiş)
  initialReviews?: Review[];        // Başlangıçta gösterilecek yorumlar (opsiyonel), Review tipinde bir dizi
}


