import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowLeftOnRectangleIcon, PencilIcon } from "@heroicons/react/20/solid";

function Home() {
  return (
    <>
      <div className="min-w-fit flex items-center justify-between phone:flex phone:items-center phone:justify-between bg-teal-100">
        <div className="min-w-0 flex-1 px-6 py-4">
          <h2 className="hidden sm:block text-2xl font-bold text-gray-900">GPM Social Network</h2>
        </div>

        <div className="flex mr-4 phone:mr-0 float right">
          <span className="">
            <a href="/api/auth/login">
              <Button className="flex flex-row ">
                Sign-in
                <ArrowLeftOnRectangleIcon className="h-3.5 w-5 text-gray-400" aria-hidden="true" />
              </Button>
            </a>
          </span>
        </div>
      </div>
      <div className="h-screen grid grid-cols-1 gap-4 content-center bg-bghome">
        <div
          className="text-center text-7xl font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-greencactus via-lightgreencactus to-greencactus
            animate-text mb-20 phone:text-3xl
            ">
          Welcome to, GPM Social Network
        </div>
      </div>
    </>
  );
}

export default Home;
