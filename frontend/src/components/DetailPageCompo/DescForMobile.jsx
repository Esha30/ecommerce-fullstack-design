import { useState } from "react";

const MobileDescription = ({ description }) => {
  const [showMore, setShowMore] = useState(false);

  const fallback = "This item is lightweight, stylish, and perfect for daily use. It features a powerful processor, long battery life, and high-resolution camera. Built with premium plastic material, supports fast charging, and runs on the latest OS. Ideal for gaming, photography, and multitasking.";
  const text = description || fallback;

  // Simple slicing for "Read More" logic
  const isLong = text.length > 100;
  const shortText = isLong ? text.slice(0, 100) + "..." : text;

  return (
    <div className="max-w-md mx-auto">
      <p className="text-gray-700 whitespace-pre-line text-[15px]">
        {showMore ? text : shortText}
      </p>
      {isLong && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-2 text-blue-600 font-semibold hover:underline text-[14px]"
        >
          {showMore ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default MobileDescription;
