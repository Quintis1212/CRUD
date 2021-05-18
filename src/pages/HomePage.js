import { useSelector } from "react-redux";
import ProductPrewiev from "../components/ProductPrewiev";
import { useState, useEffect } from "react";
import { Spinner } from "react-spinners-css";
import FilterBar from "../components/FilterBar";

export default function HomePage() {
  const content = useSelector((data) => data.contentData);
  const [render, setRender] = useState("");

  useEffect(() => {
    if (content) {
      const res = content.map((el) => {
        return <ProductPrewiev key={el.id} productItem={el} />;
      });
      setRender(res);
    } else {
      const spinner = (
        <div>
          <Spinner />
        </div>
      );
      setRender(spinner);
    }
  }, [content]);

  return (
    <>
      <div className="products-list">
        {content ? (
          <>
            <FilterBar />
            <div className="product-items-wrapper">{render}</div>
          </>
        ) : (
          render
        )}
      </div>
    </>
  );
}
