import ListStudent from "../component/ListStudent";
import AddStudent from "../component/AddStudent";
import Dashboard from "../component/Dashboard";
import ListTeacher from "../component/ListTeacher";
import AddTeacher from "../component/AddTeacher";
import AddClass from "../component/AddClass";
import ClassList from "../component/ClassList";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCardIcon from "@mui/icons-material/AddCard";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AbcIcon from "@mui/icons-material/Abc";

export const menuList = [
  { name: "Dashboard", link: "/", com: <Dashboard />, icon: <DashboardIcon /> },
  {
    name: "Add Teacher",
    link: "/addT",
    com: <AddTeacher />,
    icon: <PersonAddIcon />,
  },
  {
    name: "Teacher List",
    link: "/listT",
    com: <ListTeacher />,
    icon: <GroupIcon />,
  },
  {
    name: "Add Student",
    link: "/addS",
    com: <AddStudent />,
    icon: <AddReactionIcon />,
  },
  {
    name: "Student List",
    link: "/listS",
    com: <ListStudent />,
    icon: <AddCardIcon />,
  },
  { name: "Add Class", link: "/addC", com: <AddClass />, icon: <AbcIcon /> },
  {
    name: "Class List",
    link: "/listC",
    com: <ClassList />,
    icon: <ViewListIcon />,
  },
];
