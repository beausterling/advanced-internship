interface SkeletonProps {
  width?: string;
  height: string;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height,
  className = "",
}: SkeletonProps) {
  return (
    <div className={`skeleton ${className}`} style={{ width, height }}></div>
  );
}
