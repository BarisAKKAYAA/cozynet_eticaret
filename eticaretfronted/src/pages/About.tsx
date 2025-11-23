import React from "react";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: "images/truck.svg",
    title: "Hızlı ve Ücretsiz Kargo",
    description:
      "Siparişleriniz hızlı ve ücretsiz bir şekilde kapınıza kadar teslim edilir.",
  },
  {
    id: 2,
    icon: "images/bag.svg",
    title: "Alışveriş Kolaylığı",
    description:
      "Kullanıcı dostu arayüzümüz sayesinde alışveriş yapmak artık çok kolay.",
  },
  {
    id: 3,
    icon: "images/support.svg",
    title: "7/24 Destek",
    description:
      "Her zaman yanınızdayız! 7/24 destek ekibimizle iletişime geçebilirsiniz.",
  },
  {
    id: 4,
    icon: "images/return.svg",
    title: "Sorunsuz İade",
    description:
      "Beğenmediğiniz ürünleri kolayca iade edebilirsiniz.",
  },
];

const About: React.FC = () => {
  return (
    <div className="product-section">
      <div className="container">
        <div className="why-choose-section py-5">
            <div className="row text-center mb-5">
              <div className="col-lg-8 mx-auto">
                <h2 className="section-title fw-bold">Neden Bizi Tercih Etmelisiniz?</h2>
                <p className="text-muted">
                  CozyNest olarak müşterilerimize en iyi alışveriş deneyimini sunmayı hedefliyoruz.
                </p>
              </div>
            </div>

            <div className="row">
              {features.map((feature) => (
                <div key={feature.id} className="col-6 col-md-6 col-lg-3 mb-4">
                  <div className="feature text-center p-3 border rounded shadow-sm h-100">
                    <div className="icon mb-3">
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="img-fluid"
                        width="60"
                      />
                    </div>
                    <h4 className="fw-semibold">{feature.title}</h4>
                    <p className="text-muted small">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
   

  );
};

export default About;
