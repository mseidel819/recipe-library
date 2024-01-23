"use client";

import TabsLayout from "./layout";

const BlogPage = () => {
  return (
    <div>
      <h1>Blog Page nothing here</h1>
    </div>
  );
};

export default BlogPage;
BlogPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};
