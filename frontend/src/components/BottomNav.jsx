import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, AddCircle, Person, Logout } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(event, newValue) => {
          if (newValue === "/logout") {
            handleLogout();
          } else {
            navigate(newValue);
          }
        }}
      >
        <BottomNavigationAction label="Home" value="/feed" icon={<Home />} />
        <BottomNavigationAction label="Post" value="/create-post" icon={<AddCircle />} />
        <BottomNavigationAction label="Profile" value="/profile" icon={<Person />} />
        <BottomNavigationAction label="Logout" value="/logout" icon={<Logout />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
