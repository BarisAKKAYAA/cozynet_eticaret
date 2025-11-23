import React from "react";

const WhyChooseUsSection: React.FC = () => {
  const features = [
    { 
      icon: "/images/truck.svg", 
      title: "Hızlı ve Ücretsiz Kargo", 
      description: "Siparişleriniz özenle paketlenir ve hızlı bir şekilde kapınıza teslim edilir." 
    },
    { 
      icon: "/images/bag.svg", 
      title: "Kolay Alışveriş", 
      description: "Kullanıcı dostu arayüzümüz ile istediğiniz ürünleri kolayca bulabilir ve satın alabilirsiniz." 
    },
    { 
      icon: "/images/support.svg", 
      title: "7/24 Destek", 
      description: "Her türlü sorunuz ve talebiniz için haftanın 7 günü 24 saat destek sağlıyoruz." 
    },
    { 
      icon: "/images/return.svg", 
      title: "Sorunsuz İade", 
      description: "Memnun kalmadığınız ürünleri kolayca iade edebilir ve sorunsuz alışveriş deneyimi yaşayabilirsiniz." 
    },
  ];

  return (
    <div className="why-choose-section">
      <div className="container">
        <div className="row justify-content-between align-items-center">

          {/* Metin ve özellik kartları */}
          <div className="col-lg-6">
            <h2 className="section-title">Neden Bizi Seçmelisiniz?</h2>
            <p>
              CozyNest, evinize hem şıklık hem de konfor katmak için özenle seçilmiş mobilyalar sunar. 
              Müşteri memnuniyeti ve kaliteli hizmet önceliğimizdir.
            </p>

            <div className="row g-4 mt-4">
              {features.map((feature, index) => (
                <div key={index} className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src={feature.icon} alt={feature.title} className="img-fluid" />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Görsel */}
          <div className="col-lg-5">
            <div className="img-wrap">
              <img src="/images/why-choose-us-img.jpg" alt="Neden Bizi Seçmelisiniz" className="img-fluid" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
