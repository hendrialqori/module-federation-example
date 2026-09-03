import useCartStore from "@/stores/useCartStore";
import { createUseStyles } from "react-jss";

import CartItem from "./CartItem";

export default function CartList() {
  const classes = useStyles();

  const { cart, clearCart } = useCartStore();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className={classes.page}>
      <div className={classes.container}>
        <header className={classes.header}>
          <div>
            <h1 className={classes.title}>Cart</h1>

            <p className={classes.cartCount}>
              {totalItems} item
              {totalItems !== 1 ? "s" : ""}
            </p>
          </div>

          {cart.length > 0 && (
            <button
              type="button"
              className={classes.clearButton}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          )}
        </header>

        {cart.length === 0 ? (
          <div className={classes.empty}>Your cart is empty.</div>
        ) : (
          <>
            <div className={classes.cartList}>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <footer className={classes.footer}>
              <div>
                <p className={classes.summaryText}>Order Summary</p>

                <p className={classes.summaryItemCount}>
                  {totalItems} item
                  {totalItems !== 1 ? "s" : ""}
                </p>
              </div>

              <div className={classes.totalContainer}>
                <p className={classes.totalLabel}>Total</p>

                <p className={classes.totalPrice}>${totalPrice.toFixed(2)}</p>
              </div>
            </footer>
          </>
        )}
      </div>
    </main>
  );
}

const useStyles = createUseStyles({
  page: {
    width: "100%",
    minHeight: "100vh",
    padding: "30px",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "18px 20px",
    borderBottom: "1px solid #ccc",
  },

  title: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: 600,
  },

  cartCount: {
    margin: "4px 0 0",
    fontSize: "0.8rem",
    color: "#777",
  },

  clearButton: {
    padding: "8px 14px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease",

    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },

  empty: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#777",
  },

  cartList: {
    width: "100%",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
  },

  summaryText: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 600,
  },

  summaryItemCount: {
    margin: "4px 0 0",
    fontSize: "0.8rem",
    color: "#777",
  },

  totalContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  totalLabel: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 500,
  },

  totalPrice: {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: 700,
  },

  "@media (max-width: 700px)": {
    page: {
      padding: "15px",
    },

    footer: {
      alignItems: "flex-end",
    },
  },

  "@media (max-width: 480px)": {
    page: {
      padding: "10px",
    },

    header: {
      alignItems: "flex-start",
    },

    footer: {
      flexDirection: "column",
      alignItems: "stretch",
    },

    totalContainer: {
      justifyContent: "space-between",
    },
  },
});
