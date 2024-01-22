"use  client";

import FuzzySearch from "fuzzy-search";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import PreviewCard from "../card-preview/card-preview.component";
import styles from "./card-list.module.css";

const CardList = ({ data, category }) => {
  const [searchField, setSearchField] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const searcher = new FuzzySearch(data, ["title"], {});

  useEffect(() => {
    const results = searcher.search(searchField);
    setFilteredData(results);
  }, [data, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className={styles.big_container}>
      <TextField
        id="outlined-basic"
        label={`Search ${category}`}
        variant="outlined"
        onChange={onSearchChange}
        autoComplete="off"
        className={styles.search}
        size="small"
      />

      <div className={styles.container}>
        {filteredData.map((card) => (
          <PreviewCard key={card.id} category={category} {...card} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
