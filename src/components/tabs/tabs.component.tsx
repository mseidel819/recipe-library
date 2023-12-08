"use  client";

import styles from "./tabs.module.css";
import * as React from "react";
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CardList from "@/components/card-list/card-list.component";
import sallysData from "../../../data/sallys-baking-addiction.json";

import { useSelector, useDispatch } from "react-redux";
import { setRecipes } from "@/store/recipes/recipes.slice";
import { RootState } from "@/store/store";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const recipes = useSelector((state: RootState) => state.recipes);
  const dispatch = useDispatch();

  const sortedByCategory = recipes.recipes.reduce((acc, curr) => {
    const category = curr.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(curr);
    return acc;
  }, {});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(setRecipes(sallysData));
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile>
          {Object.entries(sortedByCategory).map(([key, val], index) => {
            return (
              <Tab
                key={key + index}
                className={styles.tab}
                label={key}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </Box>

      {Object.entries(sortedByCategory).map(([key, val], index) => {
        return (
          <CustomTabPanel key={index} value={value} index={index}>
            <CardList data={val} category={key} />
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}
