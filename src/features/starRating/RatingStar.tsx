import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const percentage = (rating / 5) * 100;

  return (
    <div className="relative inline-flex">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="h-3 w-3 text-gray-300"
            fill="currentColor"
          />
        ))}
      </div>

      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-3 w-3 shrink-0 text-orange-500"
              fill="currentColor"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarRating;