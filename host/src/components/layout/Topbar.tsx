import { createUseStyles } from "react-jss";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

export const Topbar = () => {
  const classes = useStyles();
  const cart = useCartStore((state) => state.cart);

  return (
    <header className={classes.topbar}>
      <div className={classes.shoppingCart}>
        <div className={classes.badgeCart}>{cart?.length ?? 0}</div>
        <ShoppingCart size={20} />
      </div>
    </header>
  );
};

const useStyles = createUseStyles({
  topbar: {
    position: "sticky",
    top: 0,
    zIndex: 10,

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    padding: "22.5px 30px",

    backgroundColor: "#ffffff",
    borderBottom: "1px solid #d1d5db",
  },
  shoppingCart: {
    cursor: "pointer",
    position: "relative",
  },
  badgeCart: {
    position: "absolute",
    top: "-15px",
    right: "-15px",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "white",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
