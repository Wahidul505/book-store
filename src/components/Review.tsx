interface IProp {
  review: string;
}

const Review = ({ review }: IProp) => {
  return (
    <div className="w-fit flex items-center justify-start p-3 text-sm rounded-sm bg-secondary mb-2 bg-opacity-60">
      {review}
    </div>
  );
};

export default Review;
