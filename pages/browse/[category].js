import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();
  const path = router.query.category;

  return (
    <div>
      <h1>{path}</h1>
    </div>
  );
};

export default Category;
