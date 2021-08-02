import React, { useEffect, useState } from "react";
import Card from "../../components/card/card.js";
import SubCategories from "../../components/category/category-component.js";
import "./store-page.css";
import useFetch from "../../utils/useFetch.js";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import Slider from "../../components/ProductSlider/Slider2";
import Loading from "../../components/loading/loading";
import PrimaryFooter from "../../components/primaryFooter/PrimaryFooter";

const Store = ({ searchValue }) => {
  const {
    loading,
    data: product,
    message,
    error,
  } = useFetch("http://localhost:5000/category");
  

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setCategories("");
    setSubCategories("");
    setProductData([]);
    if (product.length > 0) {
      storeCategory(product[0].categories);
      storeProducts();
    }
  }, [product]);

  const storeCategory = (value) => {
    value.map((category) => {
      if (category.parent_category !== undefined) {
        setSubCategories((response) => [
          ...response,
          {
            category: category.name,
            parent_category: category.parent_category.name,
          },
        ]);
      } else {
        setCategories((response) => [
          ...response,
          {
            category: category.name,
          },
        ]);
      }
    });
  };

  const storeProducts = () => {
    setProductData([]);
    product[0].categories.map((category) => {
      if (category.product.length !== 0) {
        category.product.map((value) => {
          setProductData((res) => [...res, value]);
        });
      }
    });
  };

  const handleCategoryProducts = (value) => {
    setProductData([]);
    product[0].categories.map((response) => {
      if (response.name === value) {
        setProductData(response.product);
      }
    });
  };

  const handleNewItemProducts = () => {
    setProductData([]);
    product[0].categories.map((category) => {
      if (category.product.length !== 0) {
        category.product.map((res) => {
          if (res.newItem) {
            setProductData((response) => [...response, res]);
          }
        });
      }
    });
  };

  const handleDiscountedItemProducts = () => {
    setProductData([]);
    product[0].categories.map((category) => {
      if (category.product.length !== 0) {
        category.product.map((res) => {
          if (res.discount !== undefined) {
            setProductData((response) => [...response, res]);
          }
        });
      }
    });
  };

  const sortProductData = () => {
    productData.sort((a, b) => {
      let x = a.createdAt.toLowerCase();
      let y = b.createdAt.toLowerCase();
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });

    return productData;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>{message}</div>
      ) : (
        <>
          {product && product[0] && <Slider images={product[0].Carousel} />}
          <div className="wrapper flex-row">
            <div className="store__page--categories">
              {categories && (
                <SubCategories
                  categories={categories}
                  subCategories={subCategories}
                  handleCategoryProduct={handleCategoryProducts}
                />
              )}
              <div className="wrapper__filter">
                <p>Filter</p>
                <a onClick={storeProducts}>All Products</a>
                <a onClick={handleNewItemProducts}>New Products</a>
                <a onClick={handleDiscountedItemProducts}>Offers</a>
              </div>
            </div>

            <div className="product__card flex">
              {productData &&
                sortProductData()
                  .filter((value) => new RegExp(searchValue).test(value.title))
                  .map((product) => {
                    console.log();
                    return (
                      <div key={product._id} className="store__page-each-card">
                        {product.images.length > 0 ? (
                          <Card
                            product_id={product._id}
                            newItem={product.newItem}
                            image={product.images[0].url}
                            title={product.title}
                            price={product.price}
                            discount={product.discount}
                          />
                        ) : (
                          <Card
                            product_id={product._id}
                            newItem={product.newItem}
                            title={product.title}
                            price={product.price}
                            discount={product.discount}
                          />
                        )}
                      </div>
                    );
                  })}
            </div>
          </div>
        </>
      )}
      <PrimaryFooter />
    </>
  );
};

export default withRouter(Store);
