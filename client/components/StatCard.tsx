interface StatCardProps {
  label: string;
  value: string | number;
  accent: "sky" | "emerald" | "amber";
}

const ACCENT_STYLES: Record<StatCardProps["accent"], string> = {
  sky: "border-sky-800/40 text-sky-400",
  emerald: "border-emerald-800/40 text-emerald-400",
  amber: "border-amber-700/40 text-amber-400",
};

function StatCard({ label, value, accent }: StatCardProps) {
  const styles = ACCENT_STYLES[accent];
  return (
    <div
      className={`border ${styles} rounded-lg p-5 bg-slate-900/60 backdrop-blur-sm`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-widest mb-3 ${styles.split(" ")[1]}`}
      >
        {label}
      </p>
      <p className="text-4xl font-bold text-slate-100 tabular-nums">{value}</p>
    </div>
  );
}

export default StatCard;