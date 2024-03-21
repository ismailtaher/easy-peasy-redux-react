import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import EditPost from "./EditPost";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { Route, Routes } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data, setPosts]);

  const posts = useStoreState((state) => state.posts);

  console.log("Posts:", posts);
  console.log("Data:", data);

  return (
    <div className="App">
      <Header title="React JS Blog"></Header>
      <Nav></Nav>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home isLoading={isLoading} fetchError={fetchError} />
          }></Route>
        <Route exact path="/post" element={<NewPost />}></Route>
        <Route path="/edit/:id" element={<EditPost />}></Route>
        <Route path="/post/:id" element={<PostPage />}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="*" element={<Missing></Missing>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
