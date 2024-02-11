const PetItem = ({ pet }) => {
  return (
    <div className=" h-60 w-60 bg-gray-50  rounded-xl mx-auto">
      <div className="w-full h-40 p-4 flex  items-center justify-center rounded-xl bg-gray-50">
        <img
          className="max-w-full max-h-full"
          src={require("../assets/dog.png")}
        />
      </div>
      <div className="p-2">
        <p className="text-lg font-bold">test</p>
        <p className="text-sm">21.02.2020</p>
      </div>
    </div>
  );
};

export default PetItem;
