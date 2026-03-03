export default function SkeletonCard() {
  return (
    <>
      <article
        style={{
          display: "flex",
          gap: "var(--space-3)",
          padding: "var(--space-6)",
        }}
      >
        <div role="status" className="skeleton box"></div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <div role="status" className="skeleton line"></div>
          <div
            role="status"
            className="skeleton line"
            style={{ width: "60%" }}
          ></div>
        </div>
      </article>
      <article
        style={{
          display: "flex",
          gap: "var(--space-3)",
          padding: "var(--space-6)",
        }}
      >
        <div role="status" className="skeleton box"></div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <div role="status" className="skeleton line"></div>
          <div
            role="status"
            className="skeleton line"
            style={{ width: "60%" }}
          ></div>
        </div>
      </article>
      <article
        style={{
          display: "flex",
          gap: "var(--space-3)",
          padding: "var(--space-6)",
        }}
      >
        <div role="status" className="skeleton box"></div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          <div role="status" className="skeleton line"></div>
          <div
            role="status"
            className="skeleton line"
            style={{ width: "60%" }}
          ></div>
        </div>
      </article>
    </>
  );
}
