export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#040404",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#C8A96E",
          boxShadow: "0 0 20px rgba(200, 169, 110, 0.6)",
          animation: "pulse 1.8s infinite ease-in-out",
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { transform: scale(0.7); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}} />
    </div>
  );
}

