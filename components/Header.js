import { Icon, Menu } from "semantic-ui-react";
import Link from "next/link";

const Header = () => {
  return (
    <Menu style={{ marginTop: "1rem" }}>
      <Link href="/"><Menu.Item>CrowdCoin</Menu.Item></Link>
      <Menu.Menu position="right">
        <Link href="/"><Menu.Item>Campaigns</Menu.Item></Link>
        <Link href="/campaigns/new"><Menu.Item>
          <Icon name="plus"></Icon>
        </Menu.Item></Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
