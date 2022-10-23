import logo from './logo.svg';
import './App.css';
import MembersComponent from './Components/Members';
import { Route, Routes } from 'react-router-dom';
import AddMemberComp from './Components/AddMember';
import UpdateMemberComp from './Components/UpdateMember';
import DeleteMemberComp from './Components/DeleteMember';
import CorinaComp from './Components/Corona';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='' element={<MembersComponent />} />
        <Route path='add' element={<AddMemberComp />} />
        <Route path='update' element={<UpdateMemberComp />} />
        <Route path='delete' element={<DeleteMemberComp />} />
        <Route path='corona' element={<CorinaComp />} />
      </Routes>
    </div>
  );
}

export default App;
