import classes from "../styles/CartItem.module.css";
import { Button, Image, Text, Title } from "@mantine/core";

const CartItem = ({ art, handleDelete }) => {
  return (
    <div className={classes.cartCtn}>
      <Image fit="cover" src={art.image} className={classes.cartImg} />
      <div className={classes.textCtn}>
        <Title order={4}>{art.title}</Title>
        <Text>
          <strong>Artist:</strong> {art.artist}
        </Text>
        <Text>
          <strong>Size:</strong> {art.size}cm
        </Text>
        <Text>
          Price: <span className={classes.priceText}>€{art.price}</span>
        </Text>
        <div className={classes.buttonCtn}>
          <Button
            onClick={() => handleDelete(art.id)}
            variant="outline"
            size="xs"
            radius="xl"
            color="light-dark(#e6757d, #8644a2)"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
