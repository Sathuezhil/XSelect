export function ArticleBody({ content }: { content: string }) {
  const blocks = content.trim().split(/\n{2,}/);
  return (
    <div className="space-y-5 text-[17px] leading-8 text-ink">
      {blocks.map((block, index) => {
        const lines = block.split("\n").filter(Boolean);
        if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {lines.map((line) => (
                <li key={line}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }
        if (block.startsWith("### ")) {
          return <h3 key={index} className="font-heading text-xl font-semibold text-navy">{block.slice(4)}</h3>;
        }
        if (block.startsWith("## ")) {
          return <h2 key={index} className="font-heading text-2xl font-semibold text-navy">{block.slice(3)}</h2>;
        }
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}
