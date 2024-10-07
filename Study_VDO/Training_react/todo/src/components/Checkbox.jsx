export default function Checkbox({ text, isChecked }) {
  return (
    <>
    <div>
      "{text}" {isChecked ? "is done" : "is in progress"}
    </div>
    </>
  );
}

// export default function Checkbox({ text, isChecked }) {
//   let ResultCheckbox = "";
//   if (isChecked) {
//     ResultCheckbox = <div>'{text}' is done</div>;
//   } else {
//     ResultCheckbox = <div>'{text}' is in progres</div>;
//   }

//   return <>{ResultCheckbox}</>;
// }
