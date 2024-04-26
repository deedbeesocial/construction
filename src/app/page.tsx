import Image from "next/image";
import { Countdown } from "./CountDown";

export default function Home() {
  // const today = new Date(); // Get the current date
  // const futureDate = new Date(today); // Create a new date object
  // futureDate.setDate(today.getDate() + 2);

  const today = new Date(); // Get the current date
  const currentYear = today.getFullYear(); // Get the current year
  const juneDate = new Date(currentYear, 5, 1);
  return (
    <main
      style={{
        backgroundImage: `url("/three3.jpg")`,

        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col h-[100vh] font-Anta justify-center text-white   gap-8 items-center p-8 bg-[#3943b4]   p-"
    >
      <div className="text-3xl leading-10 font-Anta text-center font-bold">
        Thank you for visiting. <br /> This website is under construction.
      </div>
      <div>
        {" "}
        <Countdown date={juneDate} />
      </div>

      <div className="font-Anta text-xl text-center">
        Meanwhile, to know more about our services, <br /> please reach us at
        +996 55 866 5998 or trancil@emi-saudi.com. <br /> Everest Mechanical Industries
      </div>
    </main>
  );
}
