//since using useeffect,usestate -> apply client side rendering

"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {signIn, signOut, getProviders, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
const Nav = () => {
  console.log("Rendering: Nav");
  const {data: session} = useSession(); //destructing dat from useSession hook, aliasing it as session
  const userSession = session?.user;
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const Providers = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    Providers();

    console.log("Rendering Nav");
    return () => {
      console.log("Unmounting Nav"); 
    }
  }, []);


  // console.log(session);
  // console.log(providers);

  const router = useRouter();
  //method to handle once signOut triggers -> route back to homepage
  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Session signed out!");
      
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

const navProfile = ()=>{
  router.push("/profile");
}

  return (
    <nav className="flex-between w-full mb-15 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="site-logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Accio Prompts</p>
      </Link>

      {/*Desktop navigation */}
      <div className="sm:flex hidden">
        {userSession ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            {/*Nav to user profile */}
            
              {" "}
              <Image
                src={session?.user?.image}
                width={34}
                height={34}
                className="rounded-full"
                alt="profile"
                onClick={navProfile}
              />
              {" "}

            <button type="button" className="outline_btn" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    type="button"
                    key={provider.id}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn">
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>

      {/*Mobile navigation */}
      <div className="sm:hidden flex relative">
        {userSession ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={34}
              height={34}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown(!toggleDropDown)}
            />

            {/*if toogledropdown -> show user profile*/}
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}>
                  My Profile{" "}
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link "
                  onClick={() => setToggleDropDown(false)}>
                  Create a prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                  }}
                  className="mt-4 w-full rounded black_btn">
                  Sign Out{" "}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    type="button"
                    key={provider.id}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn">
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
