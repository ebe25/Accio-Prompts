"use client";
import React, {useState, useEffect} from "react";
import PromptCard from "./PromptCard";
import _debounce from "lodash/debounce";
import Image from "next/image";

const PromptCardList = ({data, handleTagClick, isLoading}) => {
  console.log("Rendering: PromptCardList");
  return (
    <div className="mt-16 prompt_layout">
      {isLoading ? (
        <Image
          src="/assets/icons/loader.svg"
          width={60}
          height={60}
          alt="loader-gif"
        />
      ) : (
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      )}
    </div>
  );
};

const Feed = () => {
  console.log("Rendering: Feed");
  const [searchText, setSearchText] = useState(" ");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); //original data store in filterData
  const [isLoading, setIsLoading] = useState(false);


  //promptCardList m data populate
  useEffect(() => {
    //get request to fetch the prompts
    const fetchPosts = async () => {
      setIsLoading(true); //loader for feed
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
  
    // Set the post result to tag-filtered searched posts
    setSearchText(tag);
    console.log(searchText); // Log the value of searchText
    const filtered = posts.filter(
      (p) => p.tag.toLowerCase() === tag.toLowerCase()
    );
    setFilteredPosts(filtered);

  };

  //optimize network calls, using the loadash lib for debouncing
  // Corrected handleSearchChange function
  const handleSearchChange = _debounce((e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    // Use the filtered array based on searchText
    const filtered = posts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(searchText) ||
        post.tag.toLowerCase().includes(searchText) ||
        post.creator.username.toLowerCase().includes(searchText)
      );
    });

    setFilteredPosts(filtered); // Update filteredPosts with the filtered data
  }, 500);

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
      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
        isLoading={isLoading}
      
      />
    </section>
  );
};

export default Feed;
