"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user,setUser] = React.useState({
    username:"",
    email:"",
    password:""
  })
   
  const [buttonDisabled, setbButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false);

  const onSignUp = async ()=>{
    try {
      setLoading(true)
      const res = await axios.post("/api/users/signup",user);
      console.log("Signup success", res.data);
      toast.success("user created successfully") 
      router.push("/login");
    } catch (error:any) {
     toast.error(error.message)
     console.log(error) 
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setbButtonDisabled(false);
    } else {
        setbButtonDisabled(true);
    }
}, [user]);
  

  return (
    <section className="flex justify-center items-center p-36">
      <div className='flex flex-col gap-4  shadow p-12 rounded-md bg-slate-800'>
        <h1 className="text-2xl font-extralight ">{loading ? "loading..." : "Sign Up"}</h1>
        <div className="relative">

        <input type="text" placeholder="enter your username"
         value={user.username}
         id="username"
         onChange={(e)=>setUser({...user,username:e.target.value})}
         className="px-4 py-2 rounded-md text-black focus:outline-none w-full"
         />
         <span className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
  <path fill="none" d="M0 0h24v24H0z"/>
  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
</svg>

         </span>
         </div>
        <div className="relative">
          <input
            type="email"
            placeholder="enter your email"
            value={user.email}
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="px-4 py-2 rounded-md text-black focus:outline-none w-full"
          />
          <span className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 30 30"
            >
              <path d="M 4 5 C 2.9069372 5 2 5.9069372 2 7 L 2 23 C 2 24.093063 2.9069372 25 4 25 L 26 25 C 27.093063 25 28 24.093063 28 23 L 28 7 C 28 5.9069372 27.093063 5 26 5 L 4 5 z M 6.6992188 7 L 23.300781 7 L 15 13.134766 L 6.6992188 7 z M 5 9.4746094 L 15 16.865234 L 25 9.4746094 L 25 23 L 5 23 L 5 9.4746094 z"></path>
            </svg>
          </span>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="enter your password"
            value={user.password}
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="px-4 py-2 rounded-md text-black focus:outline-none w-full"
          />
          <span
            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none hover:cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </span>
        </div>
        <div>
          <Link 
          className="text-slate-400 text-xs" 
          href="/login">Already have an account? Login</Link>
        </div>

        <button 
        onClick={onSignUp}
        className="px-4 py-2 rounded-md bg-slate-600 text-slate-100 w-auto focus:outline-none focus:border-gray-600">
          {buttonDisabled ? "No signup" : "Signup"}
          </button>
        </div>
    </section>
  )
}

//     return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <h1>{loading ? "Processing" : "Signup"}</h1>
//         <hr />
//         <label htmlFor="username">username</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="username"
//             type="text"
//             value={user.username}
//             onChange={(e) => setUser({...user, username: e.target.value})}
//             placeholder="username"
//             />
//         <label htmlFor="email">email</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="email"
//             type="text"
//             value={user.email}
//             onChange={(e) => setUser({...user, email: e.target.value})}
//             placeholder="email"
//             />
//         <label htmlFor="password">password</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="password"
//             type="password"
//             value={user.password}
//             onChange={(e) => setUser({...user, password: e.target.value})}
//             placeholder="password"
//             />
//             <button
//             onClick={onSignup}
//             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
//             <Link href="/login">Visit login page</Link>
//         </div>
//     )

// }