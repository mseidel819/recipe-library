import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styles from "./image-carousel.module.css";

const getConfigurableProps = () => ({
  showArrows: true,
  showStatus: true,
  showIndicators: true,
  infiniteLoop: true,
  showThumbs: false,
  useKeyboardArrows: true,
  autoPlay: false,
  swipeable: true,
  dynamicHeight: true,
  emulateTouch: true,
  swipeScrollTolerance: 5,
});

const ImageCarousel = ({ images }) => {
  if (images) {
    return (
      <div className={styles.container}>
        <Carousel {...getConfigurableProps()}>
          {images.map((image) => (
            <div className={styles.image_container} key={image}>
              <Image className={styles.image} fill src={image} alt="" />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
};

export default ImageCarousel;
