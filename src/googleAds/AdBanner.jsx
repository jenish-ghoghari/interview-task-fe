import { useEffect, useRef } from "react";

const AdBanner = ({ dataAdSlot }) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.getAttribute("data-adsbygoogle-status")) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{
        display: "block",
        width: "100%",
        minHeight: "250px",
      }}
      data-ad-client="ca-pub-1234567890123456"
      data-ad-slot={dataAdSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdBanner;
