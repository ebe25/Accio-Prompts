"use client";
import React, {useState, useEffect} from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({data, handleTagClick}) => {
  console.log("Rendering: PromptCardList");
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  console.log("Rendering: Feed");
  const [searchText, setSearchText] = useState(" ");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {};

  //promptCardList m data populate
  useEffect(() => {
    //get request to fetch the prompts
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      {/**search bar */}
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          onChange={handleSearchChange}
        />
      </form>

      {/**List of prompts */}
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
