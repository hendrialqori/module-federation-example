import { createUseStyles } from "react-jss";
import { Link } from "react-router";

export const Sidebar = () => {
  const classes = useStyles();

  return (
    <aside className={classes.sidebar}>
      <h1 className={classes.title}>Simple Store</h1>
      <nav className={classes.menu}>
        <Link to="/" className={classes.menuItem}>
          Product
        </Link>
        <Link to="/cart" className={classes.menuItem}>
          Cart
        </Link>
      </nav>
    </aside>
  );
};

const useStyles = createUseStyles({
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: "20%",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #d1d5db",
  },

  title: {
    margin: 0,
    padding: 20,
    fontSize: 22,
    fontWeight: 700,
  },

  menu: {
    display: "flex",
    flexDirection: "column",
  },

  menuItem: {
    width: "100%",
    padding: "12px 20px",
    boxSizing: "border-box",
    borderTop: "1px solid #d1d5db",
    cursor: "pointer",
    "&:last-child": {
      borderBottom: "1px solid #d1d5db",
    },
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
    textDecoration: "none",
    color: "#000",
  },
});
