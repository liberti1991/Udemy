import { Component } from "react";
import styled from "styled-components";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Posts } from "../components/Posts";
import { loadPosts } from "../hooks/loadposts";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 50,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    console.log(e.target.value)
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;
    return (
      <Container className="container">
        {!!searchValue && <h2>Search Value: {searchValue}</h2>}
        <Input
          onChange={this.handleChange}
          value={searchValue}
          placeholder={"Pesquisar"}
        />
        {filteredPosts.length === 0 && <p>Não exitem posts! =( </p>}
        <Posts posts={filteredPosts} />
        {!searchValue && (
          <Button
            disabled={noMorePosts}
            onClick={this.loadMorePosts}
            text="Load more posts"
          />
        )}
      </Container>
    );
  }
}

const Container = styled.section`
  min-height: 100vh;
  background-color: #eee;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }

  p{
    font-size: 1.1rem;
    font-weight: 700;
    color: #888;
  }
`;
