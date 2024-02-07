import FeatherIcon from "feather-icons-react";
import React from "react";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import AddPetForm from "../components/addPetForm";

const AddPetPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="primary-color w-20 h-20 rounded-full flex items-center justify-center "
      >
        <FeatherIcon icon="plus" color="white" size={50} />
      </button>

      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        position={"bottom"}
        style={{ width: "50vw" }}
        draggable={false}
        resizable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <AddPetForm />
      </Dialog>
    </div>
  );
};

export default AddPetPage;
