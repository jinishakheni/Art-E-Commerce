import cx from "clsx";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Tabs,
  Burger,
  Drawer,
  ScrollArea,
  Menu,
  Indicator,
} from "@mantine/core";
import { FaCartShopping, FaRegUser } from "react-icons/fa6";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import classes from "../styles/Header.module.css";
import logoImg from "../assets/images/artmarketlogo.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorScheme from "./ColorScheme";
import Cart from "./Cart";
import { UserContext } from "../context/user.context";

const Header = () => {
  const navigate = useNavigate();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [burgerMenuOpened, setBurgerMenuOpened] = useState(false);
  const [cartDrawerOpened, cartDrawer] = useDisclosure(false);
  const { userDetails } = useContext(UserContext);
  const { width } = useViewportSize();

  const tabsList = ["Arts", "Artists"];
  let userList = [
    {
      key: "my_profile",
      tab: "My Profile",
      link: `/users/${JSON.parse(localStorage.getItem("user"))?.userId}`,
    },
    {
      key: "logout",
      tab: "Logout",
      link: "/",
    },
  ];
  if (userDetails.role === "buyer") {
    userList = userList.filter((ele) => ele.key !== "my_profile");
  }

  const tabItems = tabsList.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  const navDropDownItems = tabsList.map((tab) => (
    <Menu.Item
      key={tab}
      onClick={() => {
        navigate(`/${tab.toLowerCase()}`);
      }}
    >
      {tab}
    </Menu.Item>
  ));

  const userDropDownItems = userList.map((item) => (
    <Menu.Item
      key={item.key}
      onClick={() => {
        if (item.key === "logout") {
          localStorage.removeItem("user");
        }
        navigate(item.link);
      }}
    >
      {item.tab}
    </Menu.Item>
  ));

  return (
    <>
      <div className={classes.header}>
        <Container className={classes.mainSection} size="xl">
          <Group justify="space-between">
            <Burger
              color={"#ffebb2"}
              opened={burgerMenuOpened}
              onClick={() => setBurgerMenuOpened(true)}
              hiddenFrom="xs"
              size="sm"
            />
            <Avatar
              src={logoImg}
              alt={"App Logo"}
              radius="xs"
              size={60}
              onClick={() => navigate("/arts")}
            />

            <Menu
              width={width}
              offset={30}
              opened={burgerMenuOpened}
              onChange={setBurgerMenuOpened}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              shadow="md"
              withArrow
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: burgerMenuOpened,
                  })}
                ></UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown> {navDropDownItems} </Menu.Dropdown>
            </Menu>
            <Container size="md">
              <Tabs
                color="#ffebb2"
                defaultValue="Arts"
                visibleFrom="xs"
                onChange={(value) => navigate(`/${value.toLowerCase()}`)}
                classNames={{
                  root: classes.tabs,
                  list: classes.tabsList,
                  tab: classes.tab,
                }}
              >
                <Tabs.List>{tabItems}</Tabs.List>
              </Tabs>
            </Container>
            <Group gap={{ base: "sm", sm: "md", lg: "xl" }}>
              <Indicator
                inline
                label={userDetails.cart?.length}
                size={16}
                color="light-dark(#8644a2, #d0464f)"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaCartShopping size={30} onClick={cartDrawer.open} />
              </Indicator>
              <Menu
                width={200}
                position="bottom"
                withArrow
                shadow="md"
                opened={userMenuOpened}
                onChange={setUserMenuOpened}
                transitionProps={{ transition: "pop-top-right" }}
                withinPortal
                trigger="click-hover"
              >
                <Menu.Target>
                  <UnstyledButton className={classes.userIcon}>
                    <FaRegUser size={25} />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown> {userDropDownItems} </Menu.Dropdown>
              </Menu>
              <ColorScheme />
            </Group>
          </Group>
        </Container>
      </div>
      <Drawer
        offset={0}
        opened={cartDrawerOpened}
        onClose={cartDrawer.close}
        position="right"
        size="lg"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Cart closeDrawer={cartDrawer.close} />
      </Drawer>
    </>
  );
};

export default Header;
