import Button1 from "../components/btn1";

export default function Home() {
  const alertMessage = () => {
    alert("Button clicked!");
  };

  return (
    <div className="flex p-5">
      <Button1 handleClick={alertMessage} />
    </div>
  );
}
