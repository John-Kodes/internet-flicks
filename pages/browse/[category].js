import { useRouter } from "next/router";
import styles from "@/styles/Category.module.scss";

const Category = () => {
  const router = useRouter();
  const path = router.query.category;

  return (
    <div className={styles.container}>
      <div className={styles.test}>
        <h1>{path}</h1>
      </div>
    </div>
  );
};

export default Category;

export const getServerSideProps = ({ query: { category } }) => {
  console.log(category);
  return {
    props: {},
  };
};
