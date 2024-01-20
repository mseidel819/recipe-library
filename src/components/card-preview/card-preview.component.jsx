"use  client";

import styles from "./card-preview.module.css";
import Image from "next/image";
import Link from "next/link";

const PreviewCard = ({
  category,
  main_image,
  title,
  rating,
  slug,
  categories,
  id,
  author,
}) => {
  const imgUrl = new URL(main_image);
  console.log(imgUrl.pathname);
  return (
    <Link href={`/recipes/${author.id}/${id}`} className={styles.container}>
      <div className={styles.img_container}>
        <Image
          className={styles.img}
          src={imgUrl.pathname}
          // src={main_image}
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
