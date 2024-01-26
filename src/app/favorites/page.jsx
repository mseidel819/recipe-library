"use client";
import CardList from "@/components/card-list/card-list.component";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useFetchFavorites from "@/hooks/useFetchFavorites";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./page.module.css";

const FavoritesPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { isPending, isFetching, isError, data } = useFetchFavorites(session);
  const favoritesIds = data?.map((fav) => fav.id);

  if (!session) {
    router.push("/auth");
  }
  if (session) {
    return (
      <div className={styles.container}>
        <button className={styles.back_btn} onClick={() => router.back()}>
          <ArrowBackIcon />
          Back
        </button>
        <h1 className={styles.title}>Your Favorites</h1>
        {isPending && <p>Loading...</p>}
        {!data ||
          (!data.length && !isPending && (
            <p className={styles.text}>No favorites yet</p>
          ))}
        {data && (
          <CardList fav_ids={favoritesIds} data={data} isPending={isPending} />
        )}
      </div>
    );
  }
};

export default FavoritesPage;
