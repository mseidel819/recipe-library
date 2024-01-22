"use  client";

import styles from "./card-preview.module.css";
import Image from "next/image";
import Link from "next/link";

const PreviewCard = ({ main_image, title, rating, id, author }) => {
  const imgUrl = new URL(main_image);
  const imgURLFull = `${process.env.NEXT_PUBLIC_IMAGE_URL}${imgUrl.pathname}`;

  return (
    <Link href={`/recipes/${author.id}/${id}`} className={styles.container}>
      <div className={styles.img_container}>
        <Image
          className={styles.img}
          src={imgURLFull}
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
