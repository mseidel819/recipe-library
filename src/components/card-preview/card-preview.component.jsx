"use  client";

import styles from "./card-preview.module.css";
import Image from "next/image";
import Link from "next/link";

const PreviewCard = ({ img, title, rating, slug, categories }) => {
  return (
    <Link href="#" className={styles.container}>
      <div className={styles.img_container}>
        <Image
          className={styles.img}
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={styles.text_container}>
        <div>{title}</div>
        <span>Rating: {rating}</span>
      </div>
    </Link>
  );
};

export default PreviewCard;
