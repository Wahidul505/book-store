const AllBooks = () => {
  return (
    <div className="pt-20">
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search books by title, author, or genre"
          className="input input-bordered rounded-none w-full max-w-xl h-12 text-lg"
        />
      </div>
    </div>
  );
};

export default AllBooks;
