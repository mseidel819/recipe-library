import { Skeleton } from "@mui/material";
import styles from "./card-preview-loader.module.css";
const CardPreviewLoader = () => {
  return (
    <div className={styles.card_preview_loader}>
      <div className={styles.card_preview_loader_img}>
        <Skeleton variant="rectangular" width={100} height={100} />
      </div>

      <div className={styles.card_preview_loader__text}>
        <div className={styles.card_preview_loader__title}>
          <Skeleton variant="text" width={180} height={30} />
        </div>
        <div className={styles.card_preview_loader__rating}>
          <Skeleton variant="text" width={100} height={30} />
        </div>
      </div>
    </div>
  );
};

export default CardPreviewLoader;
