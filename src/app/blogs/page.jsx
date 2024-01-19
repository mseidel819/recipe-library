import TabsLayout from "./layout";

const BlogPage = () => {
  //   const { data, error } = useSWR("/api/blogs", fetcher);

  //   if (error) return <div>failed to load</div>;
  //   if (!data) return <div>loading...</div>;

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
