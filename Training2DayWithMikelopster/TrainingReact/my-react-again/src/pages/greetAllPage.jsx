import Greeting from "../components/greetingComponent";

export default function GreetAllPage() {
  return (
    <div className="w-full border p-3 ">
      <p className="text-2xl font-bold pb-2">User</p>
      <div className="h-[300px] overflow-y-auto">
        <Greeting name="John" age={25} index={0} />
        <Greeting name="Jane" age={30} index={1} />
        <Greeting name="poe" age={10} index={2} />
        <Greeting name="Jane" age={30} index={1} />
        <Greeting name="poe" age={10} index={2} />
        <Greeting name="Jane" age={30} index={1} />
        <Greeting name="poe" age={10} index={2} />
      </div>
    </div>
  );
}
