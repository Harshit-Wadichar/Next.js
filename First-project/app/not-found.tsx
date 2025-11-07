export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <div style={{ fontSize: "3rem", color: "#ff6347" }}>
        404 - Page Not Found
      </div>
      <p style={{ fontSize: "1.2rem" }}>
        Oops! The page you are looking for does not exist.
      </p>
      <a href="/" style={{ color: "#42ffc4", textDecoration: "underline" }}>
        Go back to Home
      </a>
    </div>
  );
}