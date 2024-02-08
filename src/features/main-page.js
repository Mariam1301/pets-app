import React from "react";

const MainPage = () => {
  return (
    <div className="h-full my-auto">
      <div className="w-full flex-col md:flex-row flex justify-between mx-auto  gap-10">
        <div className="md:w-1/2">
          <h1 className="text-neutral-900 text-3xl mb-5 font-semibold">
            nubs nubs nubadi
          </h1>
          <p className="text-neutral-900">
            testsetsetsetsetsetsetset testsetsetsetsetsetsetset
            testsetsetsetsetsetsetset testsetsetsetsetsetsetset
            testsetsetsetsetsetsetset
          </p>
        </div>
        <div>
          <div className="w-80 h-80 xl:w-96 xl:h-96   rounded-full   overflow-hidden flex items-center justify-center primary-color">
            <img
              src={require("../assets/dog.png")}
              className="max-w-96 max-h-96 overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
