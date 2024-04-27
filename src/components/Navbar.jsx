import { useState } from "react";
import { Box, NavLink } from "@mantine/core";
const data = ["Art", "Artist"];

function Navbar() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item}
      active={index === active}
      label={item}
      onClick={() => setActive(index)}
    />
  ));

  return <Box h={100}>{items}</Box>;
}

export default Navbar;
