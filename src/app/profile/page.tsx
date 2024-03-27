"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();

  const [data, setData] = useState("user not found");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout succesfull");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUser = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data._id)
    setData(res.data.data._id);

  };
  return (
    <div>
      <h1>user information</h1>
      <h2 className="p-1 rounded bg-green-500 w-max">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>click here</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUser}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
    </div>
  );
};

export default ProfilePage;
