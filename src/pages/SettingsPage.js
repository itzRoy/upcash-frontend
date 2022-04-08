import AdminDachboard from '../components/dashborard/AdminDachboard'
import CatDachboard from '../components/dashborard/CategoryDachboard'
import { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material'
import { useNavigate } from "react-router-dom";


const SettingsPage = () => {
  const navigate = useNavigate();

  const [settingPage, setSettingPage] = useState({
    showbtn: true,
    color: null
  });

  const handleCat = () => { setSettingPage({ showbtn: true, color: false }) }

  const handleAdmin = () => { setSettingPage({ showbtn: false, color: true }) }

  let page = null;
  if (settingPage.showbtn === true) page = <CatDachboard />;
  if (settingPage.showbtn === false) page = <AdminDachboard />;



  return (
    <div style={{ textAlign: "center" }} >

      <Button style={{ width: "100%", color: "white" }} onClick={() => { navigate("/transactions"); }}>Home</Button>
      <ButtonGroup style={{ width: "100%" }} variant="contained" aria-label="outlined button group" >

        <Button
          style={{ width: "50%", color: "white" }}
          color={settingPage.color ? "primary" : "secondary"}
          onClick={handleCat}>
          Categories
        </Button>

        <Button
          style={{ width: "50%", color: "white" }}
          color={settingPage.color ? "secondary" : "primary"}
          onClick={handleAdmin}>
          Admins
        </Button>

      </ButtonGroup>

      {page}

    </div>
  );
};

export default SettingsPage;
