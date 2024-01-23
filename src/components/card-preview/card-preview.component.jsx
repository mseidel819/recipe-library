"use  client";
import { useState } from "react";
import styles from "./card-preview.module.css";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

const PreviewCard = ({ main_image, title, rating, id, author }) => {
  const [imgLoading, setImgLoading] = useState(true);
  const imgUrl = new URL(main_image);
  const imgURLFull = `${process.env.NEXT_PUBLIC_API_URL}${imgUrl.pathname}`;

  const handleImgLoad = () => {
    setImgLoading(false);
  };

  return (
    <Link href={`/recipes/${author.id}/${id}`} className={styles.container}>
      <div className={styles.img_container}>
        {imgLoading && (
          <Skeleton
            className={styles.skeleton}
            variant="rectangular"
            width={74}
            height={100}
          />
        )}
        <Image
          className={styles.img}
          src={imgURLFull}
          onLoad={handleImgLoad}
          alt={title}
          // width={74}
          // height={100}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={styles.text_container}>
        <h2 className={styles.title}>{title}</h2>

        <span>Rating: {rating}</span>
      </div>
    </Link>
  );
};
export default PreviewCard;
