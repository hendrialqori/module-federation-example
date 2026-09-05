import useCartStore from "@/stores/useCartStore";
import { createUseStyles } from "react-jss";

type CartItemProps = {
  item: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    quantity: number;
  };
};

export default function CartItem({ item }: CartItemProps) {
  const classes = useStyles();

  const { increaseQuantity, decreaseQuantity, removeItem } =
    useCartStore();

  const subtotal = item.price * item.quantity;

  return (
    <div className={classes.item}>
      <div className={classes.imageContainer}>
        <img
          src={item.image}
          alt={item.title}
          className={classes.image}
        />
      </div>

      <div className={classes.content}>
        <p className={classes.category}>
          {item.category}
        </p>

        <h2 className={classes.productTitle}>
          {item.title}
        </h2>

        <p className={classes.description}>
          {item.description}
        </p>

        <p className={classes.rating}>
          Rating: {item.rating.rate} ({item.rating.count})
        </p>
      </div>

      <div className={classes.rightSection}>
        <p className={classes.price}>
          ${item.price.toFixed(2)}
        </p>

        <div className={classes.quantityWrapper}>
          <span className={classes.quantityLabel}>
            Quantity
          </span>

          <div className={classes.quantity}>
            <button
              type="button"
              className={classes.quantityButton}
              onClick={() => decreaseQuantity(item.id)}
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${item.title}`}
            >
              -
            </button>

            <span className={classes.quantityValue}>
              {item.quantity}
            </span>

            <button
              type="button"
              className={classes.quantityButton}
              onClick={() => increaseQuantity(item.id)}
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>
          </div>
        </div>

        <p className={classes.subtotal}>
          Subtotal: ${subtotal.toFixed(2)}
        </p>

        <button
          type="button"
          className={classes.removeButton}
          onClick={() => removeItem(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

const useStyles = createUseStyles({
  item: {
    display: "grid",
    gridTemplateColumns: "120px 1fr 170px",
    gap: "20px",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #ccc",
    boxSizing: "border-box",
  },

  imageContainer: {
    width: "120px",
    height: "120px",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  content: {
    minWidth: 0,
  },

  category: {
    margin: "0 0 6px",
    fontSize: "0.8rem",
    color: "#777",
    textTransform: "capitalize",
  },

  productTitle: {
    margin: "0 0 8px",
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },

  description: {
    margin: "0 0 10px",
    color: "#666",
    fontSize: "0.85rem",
    lineHeight: 1.5,

    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  rating: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#555",
  },

  rightSection: {
    minWidth: "170px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "12px",
  },

  price: {
    margin: 0,
    textAlign: "right",
    fontSize: "1.1rem",
    fontWeight: 600,
  },

  quantityWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
  },

  quantityLabel: {
    fontSize: "0.75rem",
    color: "#777",
  },

  quantity: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
  },

  quantityButton: {
    width: "38px",
    height: "38px",
    padding: 0,
    border: "none",
    backgroundColor: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",

    "&:first-child": {
      borderRight: "1px solid #ccc",
    },

    "&:last-child": {
      borderLeft: "1px solid #ccc",
    },

    "&:hover:not(:disabled)": {
      backgroundColor: "#f0f0f0",
    },

    "&:disabled": {
      color: "#aaa",
      backgroundColor: "#f8f8f8",
      cursor: "not-allowed",
    },
  },

  quantityValue: {
    minWidth: "42px",
    textAlign: "center",
    fontWeight: 600,
  },

  subtotal: {
    margin: 0,
    textAlign: "right",
    fontSize: "0.85rem",
    color: "#555",
  },

  removeButton: {
    width: "100%",
    padding: "9px 14px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease",

    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },

  "@media (max-width: 700px)": {
    item: {
      gridTemplateColumns: "90px 1fr",
      alignItems: "start",
    },

    imageContainer: {
      width: "90px",
      height: "90px",
    },

    rightSection: {
      gridColumn: "1 / -1",
      width: "100%",
      minWidth: 0,
      paddingTop: "15px",
      borderTop: "1px solid #eee",
    },

    price: {
      textAlign: "left",
    },

    quantityWrapper: {
      alignItems: "flex-start",
    },

    subtotal: {
      textAlign: "left",
    },
  },

  "@media (max-width: 480px)": {
    item: {
      gridTemplateColumns: "70px 1fr",
      gap: "15px",
      padding: "15px",
    },

    imageContainer: {
      width: "70px",
      height: "70px",
      padding: "7px",
    },

    description: {
      WebkitLineClamp: 3,
    },
  },
});