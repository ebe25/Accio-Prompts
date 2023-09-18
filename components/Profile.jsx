import React from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";
const Profile = ({name, desc, data, handleEdit, handleDelete, isLoading}) => {
  console.log("rendering: ProfileComponent");

  return (
    <section className="w-full">
      <h1 className="head_text text_left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {isLoading ? (
          <Image
            src="/assets/icons/loader.svg"
            height={70}
            width={70}
            alt="loader-img"
           
          />
        ) : (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => {
                handleEdit && handleEdit(post);
              }}
              handleDelete={() => {
                handleDelete && handleDelete(post);
              }}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Profile;
