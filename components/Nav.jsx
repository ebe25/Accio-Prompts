//since using useeffect,usestate -> apply client side rendering

"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {signIn, signOut, getProviders, useSession} from "next-auth/react";
const Nav = () => {
  console.log("Rendering: Nav");

  const {data: session} = useSession(); //destructing dat from useSession hook, aliasing it as session

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const Providers = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    Providers();
  }, []);

  // console.log(session);
  // console.log(providers);
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
        <p className="logo_text">PrompTopia</p>
      </Link>

      {/*Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>

            {/*Nav to user profile */}
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={34}
                height={34}
                className="rounded-full"
                alt="profile"
              />
            </Link>
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
        {session?.user ? (
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
                    signOut();
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
