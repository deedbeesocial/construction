import Image from "next/image";
import { Countdown } from "./CountDown";
import { CountdownTwo } from "./CountDownTwo";

export default function Home() {
  // const today = new Date(); // Get the current date
  // const futureDate = new Date(today); // Create a new date object
  // futureDate.setDate(today.getDate() + 2);

  const today = new Date(); // Get the current date
  const currentYear = today.getFullYear(); // Get the current year
  const augDate = new Date(currentYear, 7, 1);
  return (
    <main
      style={{
        backgroundImage: `url("/three3.jpg")`,

        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col min-h-screen md:h-[100vh] font-Barlow md:justify-center text-white   gap-8 items-center md:pt-0 pt-8 md:p-8 bg-[#3943b4]   p-4"
    >
      <img src="/footer.png" className="object-cover w- md:h-[100px]" alt="" />
      <div className=" text-xl md:text-3xl md:leading-10 font-Barlow text-center font-bold">
        Thank you for visiting. <br /> This website is under construction.
      </div>
      <div>
        {" "}
        <div className="md:flex hidden ">
          {" "}
          <Countdown date={augDate} />
        </div>
        <div className="md:hidden flex">
          <CountdownTwo date={augDate} />
        </div>
      </div>

      <div className="font-Barlow text-base md:text-xl text-center">
        Meanwhile, to know more about our services, <br /> please reach us at
        <br />
        Raju Vanka (Managing Director) <br /> +966 50 494 7116 or
        raju@emi-saudi.com
        <br /> <br />
      </div>
    </main>
  );
}
