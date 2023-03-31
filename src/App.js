import HomePage from './HomePage/HomePage';
import SearchPage from './SearchPage/SearchPage';
import AddPage from './AddPage/AddPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" exact element = {<HomePage/>}/>
          <Route path="/search" element = {<SearchPage/>}/>
          <Route path="/add" element = {<AddPage/>}/>
        </Routes>
      </Router>
  );
};
