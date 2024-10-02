import { Children, useState } from "react";

// import
import Modal from "./components/Modal";
import PropTypes from "prop-types";

function App() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={()=>setOpen(true)}>Open modal</button>
      <Modal isOpen={open} onClose={()=> setOpen(false)}>
        {/* children จะส่งเป็น dom html */}
        <div>Hello From Modal</div>
      </Modal>
    </>
  );
}

Modal.propType = {
  isOpen: PropTypes.bool.isRequired,
  Children: PropTypes.node,
  onclose: PropTypes.func.isRequired,
};

export default App;
