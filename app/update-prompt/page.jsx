"use client";
import React, {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  console.log("rendering: EditPrompt");
  //req se id nikal -> sideEffect id changes hone hai
  const searchParam = useSearchParams();
  const promptId = searchParam.get("id");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    //api fetch fetch api/prompt/[promptId]
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        //just set the prompt to current users previous prompt/ same for tag -> send to form comp
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails(); //call if id exists
  }, [promptId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true); //loader

    if (!promptId) {
      //toast notify prompt id not found
      alert("Prompt ID is not Found.");
    }
    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      //try to resolve the navigation problem-> response seems to 500 in the below if block
      if (response.status === 500) {
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleUpdate}
    />
  );
};

export default EditPrompt;
