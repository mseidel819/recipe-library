import { Skeleton } from "@mui/material";
import styles from "./recipe-loader.module.css";

const RecipeLoader = () => {
  return (
    <div className={styles.recipe_loader}>
      <Skeleton
        variant="rectangular"
        // width="65%"
        height={34}
        className={styles.title}
      />
      <Skeleton variant="rectangular" width="80%" height={16} />
      <div className={styles.info_container}>
        <div className={styles.scores}>
          <Skeleton
            className={styles.rating}
            variant="rectangular"
            height={16}
          />
          <Skeleton
            className={styles.servings}
            variant="rectangular"
            height={16}
          />
        </div>
        <div className={styles.prep}>
          <Skeleton
            className={styles.prep_item}
            variant="rectangular"
            height={16}
          />
          <Skeleton
            className={styles.prep_item}
            variant="rectangular"
            height={16}
          />
          <Skeleton
            className={styles.prep_item}
            variant="rectangular"
            height={16}
          />
        </div>
      </div>
      <div className={styles.accordion}>
        <Skeleton variant="rectangular" width="100%" height={48} />
        <Skeleton variant="rectangular" width="100%" height={48} />
        <Skeleton variant="rectangular" width="100%" height={48} />
      </div>
    </div>
  );
};

export default RecipeLoader;
