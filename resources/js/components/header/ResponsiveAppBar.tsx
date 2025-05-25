"use client"

import * as React from "react"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger,
  Slide,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import AdbIcon from "@mui/icons-material/Adb"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { Link } from "@inertiajs/react"
import Logo from "../../../../public/logo/Y.png"
import { useTheme } from "../../context/ThemeContext"


const pages = ["Home", "About", "projets", "Competences", "Experiences", "contact"]


// Scroll effect component
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
  const handleCloseNavMenu = () => setAnchorElNav(null)
  const handleCloseUserMenu = () => setAnchorElUser(null)

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  // Active page detection
  const [activePage, setActivePage] = React.useState("")

  React.useEffect(() => {

    const path = window.location.pathname
    const currentPage = pages.find(
      (page) => path.toLowerCase() === `/${page.toLowerCase()}` || (path === "/" && page.toLowerCase() === "home"),
    )

    if (currentPage) {
      setActivePage(currentPage)
    }
  }, [])


  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(10px)",
          boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "none",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo (desktop) with animation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <img
                src={Logo || "/placeholder.svg"}
                alt="Logo"
                className="w-40 h-20 m-1 rounded-full mr-3"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                  transition: "filter 0.3s ease",
                }}
              />
              <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  mr: 4,
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
                  position: "relative",
                  "&:hover": {
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                  },
                  transition: "text-shadow 0.3s ease",
                }}
              >
                {/* YassCodeur */}
              </Typography>
            </Box>

            {/* Burger menu (mobile) */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "rotate(180deg)" },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                keepMounted
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiPaper-root": {
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      transition: "background-color 0.3s ease",
                      backgroundColor: activePage === page ? "rgba(255, 255, 255, 0.1)" : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  >
                    <Typography textAlign="center" color="white">
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo (mobile) */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                flexGrow: 1,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <AdbIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
                  "&:hover": {
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                  },
                  transition: "text-shadow 0.3s ease",
                }}
              >
                YassCodeur
              </Typography>
            </Box>

            {/* Nav links (desktop) */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={`#${page.toLowerCase()}`}
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      backgroundColor: "transparent",
                      "&::after": {
                        transform: "scaleX(1)",
                      },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "5px",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "white",
                      transform: activePage === page ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "bottom right",
                      transition: "transform 0.3s ease",
                    },
                    ...(activePage === page && {
                      fontWeight: 700,
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                    }),
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {/* Theme Toggle Button */}
            <Box sx={{ mr: 2 }}>
              <Tooltip title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: isDark ? "white" : "#121212",
                    transition: "all 0.5s ease",
                    transform: isDark ? "rotate(0deg)" : "rotate(180deg)",
                    "&:hover": {
                      backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                      transform: isDark ? "rotate(30deg) scale(1.1)" : "rotate(150deg) scale(1.1)",
                    },
                  }}
                  >
                  {isDark ? (
                    <LightModeIcon
                      sx={{
                        color: "#FFD700",
                        filter: "drop-shadow(0 0 3px rgba(255, 215, 0, 0.7))",
                      }}
                    />
                  ) : (
                    <DarkModeIcon
                      sx={{
                        color: "#ffffff",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Login button */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Options utilisateur">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    color: "white",
                    padding: "10px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                    },
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <Link
                    href="/login"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    Connexion
                  </Link>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  )
}

export default ResponsiveAppBar
