"use  client";

import PreviewCard from "../card-preview/card-preview.component";
import styles from "./card-list.module.css";

const CardList = ({ data, category }) => {
  return (
    <div className={styles.container}>
      {data.map((card) => (
        <PreviewCard
          key={card.slug}
          slug={card.slug}
          category={category}
          img={card.images[0]}
          title={card.title}
          rating={card.rating}
        />
      ))}
    </div>
  );
};

export default CardList;
