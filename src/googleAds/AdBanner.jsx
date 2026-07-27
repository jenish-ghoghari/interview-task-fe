import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4684859326398267"
      data-ad-slot="6094078122"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdBanner;
