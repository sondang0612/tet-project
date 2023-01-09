import Cookies from "js-cookie";
import Layout from "../client/components/Layout";
import ProductItem from "../client/components/ProductItem";
import data from "../utils/data";

export default function HomeScreen() {
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
