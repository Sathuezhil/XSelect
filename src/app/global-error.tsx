"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", background: "#F8FAFC", color: "#1E293B", padding: 40 }}>
        <h1>Something went wrong</h1>
        <p>Please try again. If the problem continues, check the server logs.</p>
        <button type="button" onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
