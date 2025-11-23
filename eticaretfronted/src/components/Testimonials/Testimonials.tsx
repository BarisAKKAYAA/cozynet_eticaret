import React from 'react';

interface TestimonialProps {
  quote: string;
  name: string;
  image: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, image, rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? "fa fa-star text-warning" : "fa fa-star-o text-muted"}></span>
  ));

  return (
    <div className="item">
      <div className="row justify-content-center">
        <div className="col-lg-8 mx-auto">
          <div className="testimonial-block text-center">
            <blockquote className="mb-5">
              <p>&ldquo;{quote}&rdquo;</p>
            </blockquote>
            <div className="author-info">
              <div className="author-pic mb-3">
                <img src={image} alt={name} className="img-fluid rounded-circle" width="80" />
              </div>
              <h3 className="font-weight-bold">{name}</h3>
              <div className="stars">{stars}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
