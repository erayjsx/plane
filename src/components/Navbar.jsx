import { BiKey, BiUser, BiWorld } from "react-icons/bi";
import { RiCloseLargeFill, RiPriceTag3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import useAuthStore from "../stores/authStore";
import { Dialog } from "@headlessui/react";
import { DialogPanel } from "@headlessui/react";
import { DialogTitle } from "@headlessui/react";
import { Button } from "@headlessui/react";
import { useState } from "react";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const loginError = useAuthStore((state) => state.loginError);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    setIsLogin(false);
  };

  const logout = useAuthStore((state) => state.logout);

  let [isLogin, setIsLogin] = useState(false);

  return (
    <nav className="flex top-0 z-10 sticky bg-[#F6F4F8] row max-w-screen-2xl mx-auto justify-between items-center h-20 px-8">
      <div>
        <Link to="/" className="text-xl font-bold flex items-center space-x-3">
          <img src="./vite.svg" alt="" width={36} />
          <p>PlaneScape</p>
        </Link>
      </div>
      <ul className="flex items-center row space-x-6 hover:*:text-purple-700 *:*:flex *:*:transition *:*:row *:*:items-center *:*:gap-2">
        <li className="max-lg:hidden">
          <Link to="/">
            <RiPriceTag3Fill />
            <p>Deals</p>
          </Link>
        </li>
        <li className="max-lg:hidden">
          <Link to="/">
            <BiWorld />
            <p>Discover</p>
          </Link>
        </li>
        <li>
          {isAuthenticated ? (
            <Menu>
              <MenuButton>
                <div className="w-7 h-7 rounded-full bg-green-600"></div>
                <p>{username}</p>
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 rounded-xl z-10 mt-3 border *:transition bg-white p-2 shadow-lg transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 "
              >
                <MenuItem>
                  <Link
                    to="/my-flights"
                    className="group flex w-full items-center hover:bg-zinc-200 gap-2 rounded-md py-1.5 px-3"
                  >
                    My Flights
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={logout}
                    className="group flex text-red-600 hover:bg-red-100 w-full items-center gap-2 rounded-md py-1.5 px-3"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <Button
              onClick={() => setIsLogin(true)}
              className="px-6 py-1.5 rounded-full bg-white transition hover:bg-primary hover:text-white"
            >
              Login
            </Button>
          )}
        </li>
      </ul>

      <Dialog
        open={isLogin}
        as="div"
        className="relative z-10 focus:outline-none bg-black"
        onClose={() => setIsLogin(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <form
            onSubmit={handleSubmit}
            className="flex min-h-full items-center justify-center p-4"
          >
            <DialogPanel
              transition
              className="w-full max-w-sm rounded-xl bg-white p-8 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h1"
                className="text-base justify-between flex items-center font-medium text-black"
              >
                <h1 className="font-bold text-2xl w-full max-w-xs">Login</h1>
                <Button
                  className="inline-flex items-center bg-secondary hover:bg-primary hover:text-white transition gap-2 rounded-full py-3 px-3 text-xl"
                  onClick={() => setIsLogin(false)}
                >
                  <RiCloseLargeFill />
                </Button>
              </DialogTitle>
              <div className="pt-6 text-center flex flex-col w-full">
                <div className="rounded-xl overflow-hidden border-2">
                  <div className="relative w-full justify-center">
                    <BiUser className="left-4 size-5 top-3 absolute" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="bg-white text-sm focus:border-primary outline-none rounded-t-xl border-2 transition border-transparent pl-12 py-3  w-full"
                    />
                  </div>

                  <div className="relative w-full justify-center">
                    <BiKey className="left-4 size-5 top-3.5 absolute" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="bg-white border-2 transition focus:border-primary rounded-b-xl outline-none pl-12 py-3 border-transparent text-base p-2  w-full"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-primary mt-4 text-white transition hover:bg-primary/85 p-3 rounded-xl w-full"
                >
                  Login
                </button>
                {loginError && <p>{loginError}</p>}
              </div>
            </DialogPanel>
          </form>
        </div>
      </Dialog>
    </nav>
  );
};

export default Navbar;
