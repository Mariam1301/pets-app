import FeatherIcon from "feather-icons-react";
import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import AddPetForm from "../components/addPetForm";
import useAxios from "../hooks/useAxios";
import PetItem from "../components/petItem";

const AddPetPage = () => {
  const [visible, setVisible] = useState(false);

  const [getPets, getPetsResponse] = useAxios();

  function handlePetFetch() {
    getPets({ method: "GET", url: "/api/pet" });
  }

  useEffect(() => {
    handlePetFetch();
  }, []);

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="primary-color w-20 h-20 rounded-full flex items-center justify-center "
      >
        <FeatherIcon icon="plus" color="white" size={50} />
      </button>

      <div className="flex flex-wrap gap-5 justify-between my-10">
        {[1, 2, 3].map(() => (
          <PetItem></PetItem>
        ))}
      </div>

      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        position={"bottom"}
        style={{ width: "50vw" }}
        draggable={false}
        resizable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <AddPetForm onPetAdd={handlePetFetch} />
      </Dialog>
    </div>
  );
};

export default AddPetPage;
