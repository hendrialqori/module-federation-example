import { createUseStyles } from "react-jss";

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p className={classes.text}>Prepare your content ...</p>
    </div>
  );
}

const useStyles = createUseStyles({
  container: {
    width: "100%",
    height: "calc(100vh - 150px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
  },
});
