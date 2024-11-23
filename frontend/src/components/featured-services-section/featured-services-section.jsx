import { useEffect, useState } from "react";
import ServiceCard from "../service-card/service-card";
import styles from "./styles/featured-services-section.module.scss";
import axios from "redaxios";
import { useAuth } from "../../contexts/authContext";
import SkeletonCard from "../skeleton-card/skeleton-card";

function FeaturedServicesSection({ serviceType }) {
  const { currentUser } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServicesByCategory(category) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/service/category/${category}`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching featured services:", error);
      }
      setTimeout(() => setLoading(false), 1500);
      // setLoading(false);
    }

    fetchServicesByCategory(serviceType);
  }, [serviceType]);

  return (
    <div>
      <h2 style={{ marginLeft: 50, marginTop: 50, marginBottom: 30 }}>
        Featured in {serviceType}
      </h2>
      <section className={styles.featuredServices_main_container}>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
      </section>
    </div>
  );
}

export default FeaturedServicesSection;