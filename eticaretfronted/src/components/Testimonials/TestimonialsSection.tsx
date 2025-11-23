import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';
import Testimonial from './Testimonials';

interface SiteReview {
  id: number;
  customerName: string;
  comment: string;
  rating: number;
  reviewDate: string;
}

const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<SiteReview[]>([]);

  useEffect(() => {
    axios.get<SiteReview[]>('http://localhost:8080/api/sitereviews')
      .then(response => setReviews(response.data))
      .catch(error => console.error("Yorumlar yüklenirken hata oluştu:", error));
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const slider = tns({
        container: '.testimonial-slider',
        items: 1,
        axis: 'horizontal',
        controlsContainer: '#testimonial-nav',
        swipeAngle: false,
        speed: 700,
        nav: true,
        controls: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 2000,
        autoplayButtonOutput: false,
      });
      return () => slider.destroy();
    }
  }, [reviews]);

  return (
    <div className="testimonial-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mx-auto text-center">
            <h2 className="section-title">Müşteri Yorumları</h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="testimonial-slider-wrap text-center">

              <div id="testimonial-nav">
                <span className="prev" data-controls="prev">
                  <span className="fa fa-chevron-left"></span>
                </span>
                <span className="next" data-controls="next">
                  <span className="fa fa-chevron-right"></span>
                </span>
              </div>

              <div className="testimonial-slider">
                {reviews.map(r => (
                  <Testimonial
                    key={r.id}
                    quote={r.comment}
                    name={r.customerName || "Anonim Kullanıcı"}
                    image="https://cdn-icons-png.flaticon.com/512/847/847969.png"

                    rating={r.rating}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
