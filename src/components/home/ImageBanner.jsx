import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const ImageBanner = () => {
  return (
    <div className="rounded-lg text-white pt-8 hover:cursor-pointer">
      <Carousel showThumbs={false} autoPlay={true} transitionTime={3000}>
        <div>
          <img src="./images/banner1.png" alt="banner1" />
        </div>
        <div>
          <img src="./images/banner2.png" alt="banner2" />
        </div>
        <div>
          <img src="./images/banner3.png" alt="banner3" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageBanner;
