import { useEffect, useState } from "react";
import { generateKeralaReview } from "@/utils/keralaReviewGenerator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

export const KeralaReviews = () => {
  const [review, setReview] = useState(generateKeralaReview());

  useEffect(() => {
    // Generate a new review every 10 seconds
    const interval = setInterval(() => {
      setReview(generateKeralaReview());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="max-w-md mx-auto my-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="font-medium">{review.reviewerName}</div>
        <div className="flex items-center">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{review.reviewText}</p>
        <p className="text-xs text-gray-400 mt-2">{review.date}</p>
      </CardContent>
    </Card>
  );
};