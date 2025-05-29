// components/Rating.tsx
"use client";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RatingProps {
  rating: number; // misal 0–5
}

export default function Rating({ rating }: RatingProps) {
  // pastikan rating di antara 0 dan 5
  const clamped = Math.max(0, Math.min(5, Math.floor(rating)));

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={i < clamped ? faStarSolid : faStarRegular}
          className="text-red-700"
        />
      ))}
    </div>
  );
}
