"use client";
import React from "react";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Form from "@components/Form";
const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const {data: session} = useSession();
  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true); // use this state for loading-spinner

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          userId: session?.user.id,
          tag: post?.tag,
        }),
      });

      if (response.ok) {
        //route the user to the home page
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
