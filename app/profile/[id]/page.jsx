"use client";
import React, {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Profile from "@components/Profile";

const OtherUserProfile = ({params}) => {
  console.log("rendering: OtherUserProfile page");
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const userName = searchParams.get("name"); //willl get the name from the ? Query params
  const userId = params.id; //id gets inside the params obj by default

  useEffect(() => {
    const fetchUserPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/users/${userId}/posts`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log("Error", error)
      } finally{
          setIsLoading(false);
      }
    
    };
    if (userId)  fetchUserPosts();
  }, [userId]); //id per post change hoti rhigi isiliye

  const handleEdit = (post) => {
    //make sure to pass in posts since -> update-Prompt -> filtering id of posts for form comp
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you Sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((item) => {
          return item._id !== post._id;
        });
        setPosts(filteredPosts);
        console.log("deleted the prompt successfully!");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      isLoading={isLoading}
    />
  );
};

export default OtherUserProfile;
