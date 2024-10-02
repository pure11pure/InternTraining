/**
 * TODO: Carousel
 */

import { Children, useState } from "react";

// import
import Carousel from "./components/Carousel";
import PropTypes from "prop-types";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Carousel
        startIndex={1}
        images={[
          "https://fastly.picsum.photos/id/648/300/200.jpg?hmac=1CBWajz31GOLUdds_HpCDPaHDG6FF3eoY1fYcoFgEMY",
          "https://fastly.picsum.photos/id/69/300/200.jpg?hmac=eLc6u_j4wqI6rURIhekE0kS1oYHTmD7tNZ1LeEPyIeY",
          "https://fastly.picsum.photos/id/625/300/200.jpg?hmac=2JeYxbeay5cJXc4_CqXxaSVY6atO8yOJOZ9emIGYDf4",
        ]}
      ></Carousel>
    </>
  );
}
export default App;

/**
 * TODO: Modal
 */

// import { Children, useState } from "react";

// // import
// import Modal from "./components/Modal";
// import PropTypes from "prop-types";

// function App() {
//   const [open, setOpen] = useState(false)
//   return (
//     <>
//       <button onClick={()=>setOpen(true)}>Open modal</button>
//       <Modal isOpen={open} onClose={()=> setOpen(false)}>
//         {/* children จะส่งเป็น dom html */}
//         <div>Hello From Modal</div>
//       </Modal>
//     </>
//   );
// }

// Modal.propType = {
//   isOpen: PropTypes.bool.isRequired,
//   Children: PropTypes.node,
//   onclose: PropTypes.func.isRequired,
// };

// export default App;
