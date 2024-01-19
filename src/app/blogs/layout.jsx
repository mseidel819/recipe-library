"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import BasicTabs from "@/components/tabs/tabs.component";

const TabsLayout = ({ children }) => {
  const router = useRouter();
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const setAuthorHandler = (author) => {
    setSelectedAuthor(author);
  };

  const setCategoryHandler = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blog-recipes/authors")
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
      });
  }, []);

  useEffect(() => {
    if (selectedAuthor || selectedCategory) {
      router.push(`/blogs/${selectedAuthor?.id}/${selectedCategory}`);
    }
  }, [selectedAuthor, selectedCategory]);

  return (
    <div>
      <div>tab layout</div>
      <BasicTabs tabArray={authors} handler={setAuthorHandler}>
        <BasicTabs
          tabArray={selectedAuthor?.categories}
          handler={setCategoryHandler}>
          {children}
        </BasicTabs>
      </BasicTabs>
    </div>
  );
};

export default TabsLayout;
