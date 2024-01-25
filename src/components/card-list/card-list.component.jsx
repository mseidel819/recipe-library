"use  client";
import PreviewCard from "../card-preview/card-preview.component";
import CardPreviewLoader from "../loaders/preview-card/card-preview-loader.component";
import styles from "./card-list.module.css";

const CardList = ({ fav_ids, data, isPending }) => {
  return (
    <div className={styles.big_container}>
      <div className={styles.container}>
        {isPending &&
          Array(10)
            .fill()
            .map((_, i) => <CardPreviewLoader key={i} />)}
        {!isPending &&
          data?.map((card) => (
            <PreviewCard fav_ids={fav_ids} key={card.id} {...card} />
          ))}
      </div>
    </div>
  );
};

export default CardList;
