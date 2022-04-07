import AdminDachboard from '../components/SettingsPage/AdminDachboard'
import CatDachboard from '../components/SettingsPage/CategoryDachboard'
import { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";


const SettingsPage = () => {
  const navigate = useNavigate();

  const [settingPage, setSettingPage] = useState({
    showbtn: null,
  });

  const handleCat = () => { setSettingPage({ showbtn: true }) }

  const handleAdmin = () => { setSettingPage({ showbtn: false }) }

  let page = null;
  if (settingPage.showbtn === true) page = <CatDachboard />;
  if (settingPage.showbtn === false) page = <AdminDachboard />;

  return (
    <div style={{ textAlign: "center"}} >
                
      <ButtonGroup variant="contained" aria-label="outlined primary button group"  style={{ width: "100%"}}>
        <Button style={{ width: "33%"}} onClick={() => { navigate("/transactions"); }}>Home</Button>
        <Button style={{ width: "33%"}} onClick={handleCat}>Categories</Button>
        <Button style={{ width: "33%"}} onClick={handleAdmin}>Admins</Button>
      </ButtonGroup>
   
    
      {page}

    </div>
  );
};

export default SettingsPage;
