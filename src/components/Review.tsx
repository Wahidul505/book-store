import { MdOutlineModeComment } from "react-icons/md";

interface IProp {
  review: string;
}

const Review = ({ review }: IProp) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-2xl">
        <MdOutlineModeComment />
      </div>
      <div className="w-fit flex items-center justify-start p-2 text-sm rounded bg-secondary mb-2 bg-opacity-60">
        {review}
      </div>
    </div>
  );
};

export default Review;
