import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import logo from "../assets/images/artmarketlogo.png";
import classes from "../styles/Footer.module.css";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Store" },
  { link: "#", label: "Careers" },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="light-dark(#ffebb2, #ffebb2)"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <img src={logo} className={classes.logo} />
        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            c="light-dark(#e6757d, #8644a2)"
          >
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={2.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            c="light-dark(#e6757d, #8644a2)"
          >
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={2.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            c="light-dark(#e6757d, #8644a2)"
          >
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={2.5}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
