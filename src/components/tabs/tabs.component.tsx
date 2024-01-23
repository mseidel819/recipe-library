"use  client";

import styles from "./tabs.module.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import type { Author } from "../../types";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Props = {
  componentType: "authors" | "categories";
  tabArray: Author[] | string[];
  handler: (selectedTab: Author | string) => void;
  children: React.ReactNode;
};

export default function BasicTabs({
  componentType,
  tabArray,
  handler,
  children,
}: Props) {
  const pathName = usePathname();
  const [value, setValue] = useState(0);

  const [_, _2, author_id, category_name] = pathName.split("/");

  const tabValue = tabArray?.findIndex((tab) => {
    if (typeof tab === "object" && componentType === "authors" && "id" in tab) {
      return tab.id === +author_id;
    }
    return tab === category_name;
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handler(tabArray[newValue]);
  };

  useEffect(() => {
    if (tabArray && tabValue !== -1) {
      handler(tabArray[tabValue]);
      console.log("tabValue", tabValue);
      setValue(tabValue);
    } else if (tabArray) {
      handler(tabArray[0]);
      setValue(0);
    }
  }, [tabArray, tabValue]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        className={styles.tabs_container}
        sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile>
          {tabArray &&
            tabArray.map((info, index: number) => {
              if (
                typeof info === "object" &&
                componentType === "authors" &&
                "id" in info &&
                "name" in info
              ) {
                return (
                  <Tab
                    key={info.id}
                    className={styles.tab}
                    label={info.name}
                    {...a11yProps(index)}
                  />
                );
              }
              if (componentType === "categories" && typeof info === "string") {
                return (
                  <Tab
                    key={info + index}
                    className={styles.tab}
                    label={info}
                    {...a11yProps(index)}
                  />
                );
              }
            })}
        </Tabs>
      </Box>
      {children}
    </Box>
  );
}
