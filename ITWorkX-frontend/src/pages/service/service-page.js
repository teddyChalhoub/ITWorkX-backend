import React, { useEffect, useState } from "react";
import "./service-page.css";
import ServiceDisplay from "../../components/ServiceDisplay/serviceDisplay1";
import ServiceCard from "../../components/ServiceDisplay/serviceCard";
import PrimaryFooter from "../../components/primaryFooter/PrimaryFooter";
import Loading from "../../components/loading/loading";
import axios from "axios";

const Service = ({ searchValue }) => {
  const [visible, isVisible] = useState(false);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [serviceData, setServiceData] = useState([]);

  const handleVisibilityAndData = (value, data) => {
    isVisible(value);
    setService(data);
  };

  const fetchServices = async () => {
    setLoading(true);
    setError(false);
    setServiceData([]);
    setMessage("");

    try {
      const response = await axios.get("http://localhost:5000/service");
      const data = response.data;
      if (!data.success) {
        throw new Error(data.message);
      }
      setServiceData(data.data);
      setLoading(false);
      setError(false);
      setMessage("");
    } catch (e) {
      setLoading(false);
      setError(true);
      setMessage(e.message);
      setServiceData([]);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        alert(message)
      ) : visible ? (
        <ServiceDisplay service={service} />
      ) : (
        <div className="service_wrapper">
          <p className="p_first">
            Emerging company and specialize in offer 360 degree web and digital
            marketing solutions to make your company become a brand in the
            online marketing world. From website design, web development,
            content marketing, our team of mavens come with solutions that bring
            digital revolution. Just name the services you need for your online
            business and we will deliver you excellent solution in a unique
            style.
          </p>

          {serviceData &&
            serviceData
              .filter((value) => new RegExp(searchValue).test(value.title))
              .map((res, index) => {
                return (
                  <ServiceCard
                    response={res}
                    second={index % 2 == 0}
                    handleVisibilityAndData={handleVisibilityAndData}
                  />
                );
              })}
        </div>
      )}
      <PrimaryFooter />
    </>
  );
};

export default Service;
