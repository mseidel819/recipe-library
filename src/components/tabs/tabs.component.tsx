"use  client";

import styles from "./tabs.module.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  componentType,
  tabArray,
  handler,
  children,
}) {
  const pathName = usePathname();
  const [value, setValue] = useState(0);

  const [_, _2, author_id, category_name] = pathName.split("/");

  const tabValue = tabArray?.findIndex((tab) => {
    if (componentType === "authors") {
      return tab.id === +author_id;
    }
    console.log(tab, category_name);
    return tab === category_name;
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handler(tabArray[newValue]);
  };

  useEffect(() => {
    if (tabArray && tabValue !== -1) {
      handler(tabArray[tabValue]);
      setValue(tabValue);
    } else if (tabArray) {
      handler(tabArray[0]);
      setValue(0);
    }
  }, [tabArray, tabValue]);

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
          {tabArray &&
            tabArray.map((info, index: number) => {
              if (info.name) {
                return (
                  <Tab
                    key={info.name + index}
                    className={styles.tab}
                    label={info.name}
                    {...a11yProps(index)}
                  />
                );
              }
              return (
                <Tab
                  key={info + index}
                  className={styles.tab}
                  label={info}
                  {...a11yProps(index)}
                />
              );
            })}
        </Tabs>
      </Box>
      {children}
    </Box>
  );
}
