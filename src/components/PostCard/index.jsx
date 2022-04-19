import styled from "styled-components";

export const PostCard =({ post }) => (
  <CardPost key={post.id}>
    <img src={post.cover} alt={post.title} />
    <CardContent>
      <h5>ID: <span>{post.id}</span></h5>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </CardContent>
  </CardPost>
);

const CardPost = styled.div`
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: transform 100ms ease-in-out;

  :hover {
    transform: scale(1.05);
  }

  img {
    max-width: 100%;
    border-radius: 5px 5px 0 0;
  }
`;

const CardContent = styled.div`
  padding: 10px;

  h5{
    padding: 5px 0;
    
    span {
      color: red;
    }
  }
`;
