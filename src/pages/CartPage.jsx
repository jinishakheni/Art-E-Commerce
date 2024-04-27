import { useEffect, useContext } from "react";
import Cart from "../components/Cart";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import { BreadcrumbContext } from "../context/breadcrumb.context";

const CartPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { setItemList } = useContext(BreadcrumbContext);

  useEffect(() => {
    setItemList([{ title: "Cart Details" }]);
  }, []);

  return (
    <>
      <Drawer
        offset={0}
        opened={opened}
        onClose={close}
        position="right"
        size="xl"
      >
        <Cart />
      </Drawer>
      <Button onClick={open}>Open Drawer</Button>
    </>
  );
};

export default CartPage;
