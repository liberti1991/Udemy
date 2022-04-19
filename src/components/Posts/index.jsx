import styled from "styled-components";

import { PostCard } from "../PostCard";

export const Posts = ({ posts }) => (
  <ContainerPosts className="posts">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </ContainerPosts>
);

const ContainerPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;
