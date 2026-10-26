import Skeleton from "./Skeleton";

export default function BookCardSkeleton() {
  return (
    <div className="book__card">
      <Skeleton height="172px" className="book__card--img-mask" />
      <Skeleton width="80%" height="20px" className="skeleton__line" />
      <Skeleton width="60%" height="16px" className="skeleton__line" />
      <Skeleton height="32px" className="skeleton__line" />
      <Skeleton width="50%" height="16px" />
    </div>
  );
}
