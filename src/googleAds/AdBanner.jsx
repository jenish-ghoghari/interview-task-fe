import { useEffect, useRef, useState } from "react";

const AdBanner = ({ dataAdSlot = "6094078122" }) => {
  const adInitialized = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAd = () => {
      if (!adInitialized.current) {
        try {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
          adInitialized.current = true;
          setAdLoaded(true);
        } catch (error) {
          console.error("AdSense error:", error);
          setAdLoaded(false);
        }
      }
    };

    // Wait for the adsbygoogle script to be available
    if (window.adsbygoogle !== undefined) {
      loadAd();
    } else {
      // If script isn't ready yet, try again after a short delay
      const timer = setTimeout(loadAd, 1000);
      return () => clearTimeout(timer);
    }
  }, [dataAdSlot]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "120px",
        backgroundColor: "#f3f4f6",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "20px",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minHeight: "90px",
        }}
        data-ad-client="ca-pub-4684859326398267"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {!adLoaded && (
        <div
          style={{
            position: "absolute",
            fontSize: "14px",
            color: "#9ca3af",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <p style={{ margin: "0 0 8px 0" }}>📢 Advertisement</p>
          <p style={{ margin: 0, fontSize: "12px" }}>
            {window.adsbygoogle ? "Loading ad..." : "Ad blocker detected or ads unavailable"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdBanner;
