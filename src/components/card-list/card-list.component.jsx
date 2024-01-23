"use  client";

import FuzzySearch from "fuzzy-search";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import PreviewCard from "../card-preview/card-preview.component";
import CardPreviewLoader from "../loaders/preview-card/card-preview-loader.component";
import styles from "./card-list.module.css";

const CardList = ({ data, isPending }) => {
  // const [searchField, setSearchField] = useState("");
  // const [filteredData, setFilteredData] = useState(data);

  // const searcher = new FuzzySearch(data, ["title"], {});

  // useEffect(() => {
  //   const results = searcher.search(searchField);
  //   setFilteredData(results);
  // }, [data, searchField]);

  // const onSearchSubmit = (event) => {
  //   const searchFieldString = event.target.value.toLocaleLowerCase();
  //   setSearchField(searchFieldString);
  // };

  return (
    <div className={styles.big_container}>
      {/* <TextField
        id="outlined-basic"
        label={`Search ${category}`}
        variant="outlined"
        onSubmit={onSearchSubmit}
        autoComplete="off"
        className={styles.search}
        size="small"
      /> */}

      <div className={styles.container}>
        {isPending &&
          Array(10)
            .fill()
            .map((_, i) => <CardPreviewLoader key={i} />)}
        {!isPending &&
          data?.map((card) => <PreviewCard key={card.id} {...card} />)}
      </div>
    </div>
  );
};

export default CardList;
