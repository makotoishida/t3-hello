import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { Calendar, DatePicker } from "@mantine/dates";
import { api } from "../utils/api";

function Demo() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="p-4 flex gap-4  bg-white">
      <>
        <DatePicker
          onChange={setSelectedDate}
          value={selectedDate}
        />
        <hr />
        <br />
        <Calendar
          onClick={() => console.log("onClick")}
          onChange={setSelectedDate}
          value={selectedDate}
          month={selectedDate || undefined}
        />
      </>
    </div>
  );
}

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>T3 Hello</title>
        <meta name="description" content="Hello World create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Hello <span className="text-[hsl(280,100%,70%)]">T3</span>!
          </h1>
          <Demo />
        </div>
      </main>
    </>
  );
};

export default Home;
