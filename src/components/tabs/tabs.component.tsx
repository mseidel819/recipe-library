"use  client";

import styles from "./tabs.module.css";
import * as React from "react";
import { useState, useCallback } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

// enter an array of tabs to display.
// enter an array of categories to display.
// main level displays tabs of author names. gets array of auth details
// sub level displays categories based on the tab selected. gewts aray of categories from auth details
// sub sub level displays cards based on the category selected. makes api call to get cards based on  author id and category

export default function BasicTabs({ tabArray, handler, children }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handler(tabArray[newValue]);
  };

  React.useEffect(() => {
    if (tabArray) {
      handler(tabArray[0]);
      setValue(0);
    }
  }, [tabArray]);

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
