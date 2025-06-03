import NavigationMenu from "@/app/components/NavigationMenu";

const Header = () => {
  return (
    <div className="fixed top-0 w-full h-8 bg-black flex flex-row justify-stretch">
      <div>
        <h1>MARCO HUWIG</h1>

        <h2>WEBENTWICKLER</h2>
      </div>

      <NavigationMenu></NavigationMenu>
    </div>
  );
};

export default Header;
