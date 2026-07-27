import { useEffect, useRef } from "react";

const AdBanner = ({ dataAdSlot }) => {
  const adInitialized = useRef(false);

  useEffect(() => {
    // Only push the ad if it hasn't been initialized yet
    if (!adInitialized.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized.current = true; // Mark as initialized
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4684859326398267"
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdBanner;
