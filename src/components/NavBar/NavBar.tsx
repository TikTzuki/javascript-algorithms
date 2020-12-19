import {AppBar, IconButton, Toolbar, withStyles} from '@material-ui/core';
import {deepPurple} from '@material-ui/core/colors';
import Menu from '@material-ui/icons/Menu';
import React, {Fragment, useState, useSelector} from 'react';
const drawerWidth=240;

const styles = (theme: any) => {
  console.log(theme);
  return {
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up("md")]: {
        position: "relative",
      },
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    buttonNav: {
      width: "100%",
      textTransform: "none"
    },
    userAvatar: {
      flex: "2 2 100% "
    },
    logoApp: {
      flex: "1 1 100%"
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: 'small',
      textTransform: 'uppercase',
      textDecoration: 'none'
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    expandIcon: {
      opacity: 0.5,
      marginLeft: theme.spacing(1)
    }
  }
};

const NavBar=()=>{
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropSwitcher, setDropSwitcher] = useState(-1)
  const user = useSelector(state => state.user)
  const {
    classes,
    location: { pathname },
    children
  } = props;
  const handleDropdown = (event) => {
    setDropSwitcher((dropSwitcher === event.currentTarget.getAttribute("drop-index") ? -1 : event.currentTarget.getAttribute("drop-index")));
    console.log(event.currentTarget.getAttribute("drop-index"))
    //console.log(this.state.anchorEl);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <MenuList>
      {listMenu.map((menuItem) => {
            if ((menuItem.hasOwnProperty('dropdownList'))) {
              return (<div key={menuItem.name}>
                <MenuItem component={Button} key={menuItem.name} disableRipple className={classes.buttonNav} drop-index={menuItem.name} variant="text" onClick={handleDropdown}>
                  {menuItem.name} {dropSwitcher===menuItem.name ? <ExpandLessIcon fontSize="small" className={classes.expandIcon}/> : <ExpandMoreIcon fontSize="small" className={classes.expandIcon}/> }
                </MenuItem>
                <Collapse in={dropSwitcher === menuItem.name ? true : false} timeout={300}>
                  <MenuList>
                    {menuItem.dropdownList.map((dropDownItem)=>{
                      return (
                        <MenuItem to={menuItem.to+dropDownItem.to} key={dropDownItem.name} className={classes.nested} component={Link} selected={menuItem.to+dropDownItem.to === pathname}>
                          {dropDownItem.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Collapse>
              </div>)
            } else {
              return (
                <MenuItem key={menuItem.name} component={Link} to={menuItem.to} selected={menuItem.to === pathname}>
                  {menuItem.name}
                </MenuItem>)
            }
      })}
      </MenuList>
    </div>
  );
  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.navIconHide}
            >
              < Menu />
            </IconButton>
            <Typography className={classes.logoApp} variant="h6" color="inherit" noWrap>
              Override project
            </Typography>
            <Grid container alignItems="center" justify="flex-end">
              <Grid item alignContent="flex-end">
                <AvatarComp />
              </Grid>
              <Grid item >
                <ThemeSwitchIcon/>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} classes={{ paper: classes.drawerPaper, }} ModalProps={{ keepMounted: true, }}>
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper, }}>
            {drawer}
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </Fragment>
  );
}

export default withStyles(style)(NavBar);
