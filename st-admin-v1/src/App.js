import * as React from 'react';
import './App.css';
import { Header } from '../src/component/Header';
import { createTheme,ThemeProvider } from '@mui/material';
import { Switch, Route, Link } from "react-router-dom";
import {menuList} from './routing/sidebarRouting'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Copyright from '../src/component/Copyright';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ClassInfo from './component/ClassInfo';
import StudentInfo from './component/StudentInfo';
import TeacherInfo from './component/TeacherInfo';
import EditStudent from './component/EditStudent';
import EditTeacher from './component/EditTeacher'
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;
function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  const history=useHistory();

  return (
   
    

<div className="App">
<ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {Header}
      <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
    >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>

            <List>
                {menuList.map((item, index) => (
                    <ListItem button key={index} onClick={() => history.push(item.link)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
     
        </Box>
    </Drawer>
                    
    <Switch>
    <Route exact path="/cInfo/:id" ><ClassInfo /></Route>
      <Route exact path="/editS/:id"><EditStudent /></Route>
      <Route exact path="/editT/:id"><EditTeacher /></Route>
      <Route exact path="/tInfo/:id" ><TeacherInfo /></Route>
      <Route exact path="/sInfo/:id" ><StudentInfo /></Route>
      {menuList.map((it,index)=><Route key={index} exact path={it.link}>{it.com}</Route>  )}

    </Switch>
    
    </Box>
    
    <Copyright />
    </ThemeProvider>
    
    </div>
   
  )
}

export default App;
