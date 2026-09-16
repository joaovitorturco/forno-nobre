export function Brand({ tagline = true }: { tagline?: boolean }) {
  return (
    <div className="brand">
      <div className="brand__mark" aria-hidden>
        🍕
      </div>
      <div>
        <div className="brand__name">
          Forno <span>Nobre</span>
        </div>
        {tagline && <div className="brand__tag">onde a massa vira arte</div>}
      </div>
    </div>
  );
}
