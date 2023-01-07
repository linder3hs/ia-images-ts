import { ImagesResponse } from "openai";
import styles from "../../styles/Home.module.css";

interface GalleryProps {
  images: ImagesResponse;
}

export default function Gallery({ images }: GalleryProps) {
  console.log("images", images);
  return (
    <>
      <div className={styles.gallery}>
        {images.data.map(({ url }, index) => (
          <div key={index} className={styles.gallery__item}>
            <img src={url} alt="image" />
          </div>
        ))}
      </div>
    </>
  );
}
