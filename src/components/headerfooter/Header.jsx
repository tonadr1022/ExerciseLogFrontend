/* eslint-disable react/prop-types */
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../../App";
import { Link } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleToggle = () => {
    colorMode.toggleColorMode();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogoutClick = () => {
    logoutUser();
  };

  const handleRedirect = () => {
    const redirectUrl = new URL("https://www.strava.com/oauth/authorize/");
    const params = new URLSearchParams({
      client_id: "103399",
      redirect_uri:
        "https://exercise-log-backend.herokuapp.com/strava/authorization/",
      response_type: "code",
      approval_prompt: "force",
      scope: "read_all,activity:read_all,profile:read_all",
      state: JSON.stringify({ user_id: user.user_id }),
    });
    redirectUrl.search = params.toString();

    window.location.href = redirectUrl;
  };

  return (
    <>
      <AppBar position="sticky" component="header">
        <Toolbar component="nav">
          <Tooltip title="Home">
            <IconButton
              to="/"
              component={Link}
              size="large"
              edge="start"
              color="inherit"
              sx={{ display: { xs: user ? "none" : "flex", md: "flex" } }}>
              <DirectionsRunIcon />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h4"
            noWrap
            to="/"
            component={Link}
            sx={{
              cursor: "pointer",
              mr: 2,
              flexGrow: user ? 0 : 1,
              display: { xs: user ? "none" : "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 300,
              color: "inherit",
              textDecoration: "none",
            }}>
            Track Me
          </Typography>
          {user && (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}>
                <MenuItem
                  component={Link}
                  to="/my-exercises"
                  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Exercises</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/my-shoes"
                  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Shoes</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/statistics"
                  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Stats</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}

          {user && (
            <>
              <Box
                id="asdf"
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  mr: 2,
                  ml: 2,
                  justifyContent: "center",
                }}>
                <Tooltip title="Home">
                  <IconButton
                    to="/"
                    component={Link}
                    size="large"
                    edge="start"
                    color="inherit">
                    <DirectionsRunIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                spacing={2}>
                <>
                  <Button to="/my-exercises" component={Link} color="inherit">
                    Exercises
                  </Button>
                  <Button to="/my-shoes" component={Link} color="inherit">
                    Shoes
                  </Button>
                  <Button to="/statistics" component={Link} color="inherit">
                    Stats
                  </Button>
                  {!user.strava_authorized && (
                    <Button onClick={handleRedirect} color="inherit">
                      Authorize Strava
                    </Button>
                  )}
                </>
              </Box>
            </>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="large"
              onClick={handleOpenUserMenu}
              sx={{ p: 1, color: "inherit" }}>
              <AccountCircle fontSize="large" sx={{}} />
            </IconButton>
            <Menu
              sx={{ mt: 5 }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {user
                ? [
                    // <MenuItem
                    //   key={"profile"}
                    //   component={Link}
                    //   to="/profile"
                    //   color="inherit"
                    //   onClick={handleCloseUserMenu}>
                    //   <Typography>Profile</Typography>
                    // </MenuItem>,
                    <MenuItem
                      key={"strava"}
                      color="inherit"
                      component={Link}
                      to="/strava"
                      onClick={handleCloseUserMenu}>
                      <Typography>Strava</Typography>
                    </MenuItem>,
                    <MenuItem key={"darkMode"} onClick={handleToggle}>
                      <Typography>
                        {theme.palette.mode === "light"
                          ? "Switch to Dark Mode"
                          : "Switch to Light Mode"}
                      </Typography>
                    </MenuItem>,
                    <MenuItem
                      key={"logout"}
                      color="inherit"
                      onClick={handleLogoutClick}>
                      <Typography>Logout</Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key={"register"}
                      component={Link}
                      to="/register"
                      color="inherit"
                      onClick={handleCloseUserMenu}>
                      <Typography>Sign Up</Typography>
                    </MenuItem>,
                    <MenuItem
                      key={"login"}
                      component={Link}
                      to="/login"
                      color="inherit"
                      onClick={handleCloseUserMenu}>
                      <Typography>Login</Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
