import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";
import { RootState } from "../utils/store/store";

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:gird-cols-5">
        {data.products.map((product, index) => {
          return <ProductItem product={product} key={index} />;
        })}
      </div>
    </Layout>
  );
}
