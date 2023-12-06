"use  client";

import styles from "./tabs.module.css";
import * as React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CardList from "@/components/card-list/card-list.component";
import BreadData from "../../../data/sallys-baking-addiction/bread.json";
import BreakfastData from "../../../data/sallys-baking-addiction/breakfast-treats.json";
import CakeData from "../../../data/sallys-baking-addiction/desserts-cakes.json";
import CookieData from "../../../data/sallys-baking-addiction/desserts-cookies.json";
import PieData from "../../../data/sallys-baking-addiction/desserts-pies.json";

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

  const dataObj = {
    bread: BreadData,
    "breakfast-treats": BreakfastData,
    "desserts-cakes": CakeData,
    "desserts-cookies": CookieData,
    "desserts-pies": PieData,
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example">
          <Tab className={styles.tab} label="Bread" {...a11yProps(0)} />
          <Tab className={styles.tab} label="Breakfast" {...a11yProps(1)} />
          <Tab className={styles.tab} label="Cakes" {...a11yProps(2)} />
          <Tab className={styles.tab} label="Cookies" {...a11yProps(3)} />
          <Tab className={styles.tab} label="Pies" {...a11yProps(4)} />
        </Tabs>
      </Box>
      {Object.entries(dataObj).map(([key, val], index) => {
        return (
          <CustomTabPanel key={index} value={value} index={index}>
            <CardList data={val} category={key} />
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}
