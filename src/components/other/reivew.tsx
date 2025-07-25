import { OptimizedImage } from "./optimized-image";
import { Star } from "lucide-react";

export default function Review({
  name,
  image,
  review,
  role,
}: {
  name: string;
  image: string;
  review: string;
  role?: string;
}) {
  return (
    <>
      <div className="flex items-center justify-center max-w-xl mx-auto flex-col gap-8">
        <div className="flex items-center gap-1">
          <Star size={20} fill="#eab308" stroke="none" />
          <Star size={20} fill="#eab308" stroke="none" />
          <Star size={20} fill="#eab308" stroke="none" />
          <Star size={20} fill="#eab308" stroke="none" />
          <Star size={20} fill="#eab308" stroke="none" />
        </div>
        <p className="text-center">{review}</p>
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-card overflow-ellipsis">
            <OptimizedImage
              src={image}
              width={45}
              height={45}
              alt={name}
              className="rounded-card"
            />
          </div>
          <div className="flex items-start justify-center flex-col">
            <p>{name}</p>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>
        </div>
      </div>
    </>
  );
}
