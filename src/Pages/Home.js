import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Posts } from "../components/Posts";
import { loadPosts } from "../hooks/loadposts";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(20);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleloadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    console.log(new Date().toLocaleString("pt-br"));
    handleloadPosts(0, postsPerPage);
  }, [handleloadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(e.target.value);

    setSearchValue(value);
  };

  return (
    <Container className="container">
      {!!searchValue && <h2>Search Value: {searchValue}</h2>}
      <Input
        onChange={handleChange}
        value={searchValue}
        placeholder={"Type your search"}
      />
      {filteredPosts.length === 0 && <p>Não exitem posts! =( </p>}
      <Posts posts={filteredPosts} />
      {!searchValue && (
        <Button
          disabled={noMorePosts}
          onClick={loadMorePosts}
          text="Load more posts"
        />
      )}
    </Container>
  );
};

const Container = styled.section`
  min-height: 100vh;
  background-color: #eee;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    font-weight: 700;
    color: #888;
  }
`;
