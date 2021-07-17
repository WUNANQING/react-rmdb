import { GlobalStyle } from './GlobalStyle'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";


const App = () => (
    <Router>
      <GlobalStyle />
      <Header />
      {/* 一般是Switch > Route; 
      但範例用Routes > Route 而且屬性用element 不是component
      並且可不用exact
      */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:movieId" element={<Movie />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router >
  );

export default App;
