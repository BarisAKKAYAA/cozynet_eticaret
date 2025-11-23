import React from 'react';


const WeHelpSection: React.FC = () => {
  return (
    <div className="we-help-section">
      <div className="container">
        <div className="row justify-content-between">

          {/* Görseller */}
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="imgs-grid">
              <div className="grid grid-1">
                <img src="images/img-grid-1.jpg" alt="Image 1" />
              </div>
              <div className="grid grid-2">
                <img src="images/img-grid-2.jpg" alt="Image 2" />
              </div>
              <div className="grid grid-3">
                <img src="images/img-grid-3.jpg" alt="Image 3" />
              </div>
            </div>
          </div>

          {/* Yazılar */}
          <div className="col-lg-5 ps-lg-5">
        <h2 className="section-title mb-4">Modern İç Mekan Tasarımında Yanınızdayız</h2>
        <p>
          CozyNest olarak, evinizi hem şık hem de konforlu bir yaşam alanına dönüştürmenize yardımcı oluyoruz. 
          Her tasarımımız, sıcak ve rahat köşeler yaratmanız için özenle seçildi.
        </p>
        <ul className="list-unstyled custom-list my-4">
          <li>Yüksek kaliteli ve dayanıklı mobilya seçenekleri</li>
          <li>Ev dekorasyonuna uygun modern tasarımlar</li>
          <li>Konfor ve şıklığı bir arada sunan ürünler</li>
          <li>Evinizin her köşesi için estetik çözümler</li>
        </ul>
        <p>
          <a href="/shop" className="btn btn-primary">Keşfet</a>
        </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WeHelpSection;
