import Alert from "@/Components/Alert";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import SocialMediaLink from "@/Components/SocialMediaLink";
import { ShoppingBagIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Authenticated({ header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  const { flash } = usePage().props;
  const { auth } = usePage().props;
  const { cartCount } = usePage().props;
  const { errors } = usePage().props;

  return (
    <div className="relative flex min-h-screen flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link href={route("home")} as="a">
                  <ApplicationLogo className="block h-9 w-auto fill-current" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink href={route("home")} active={route().current("home")}>
                  Home
                </NavLink>
                <NavLink
                  href={route("product.index")}
                  active={route().current("product.index")}
                >
                  Products
                </NavLink>
                <NavLink
                  href={route("design.index")}
                  active={route().current("design.index")}
                >
                  Design
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {auth?.user ? (
                <>
                  <Link
                    href={route("cart.index")}
                    as="button"
                    className="btn-ghost btn-circle btn"
                  >
                    <div className="indicator">
                      {cartCount > 0 && (
                        <span className="badge badge-secondary badge-sm indicator-item">
                          {cartCount}
                        </span>
                      )}
                      <ShoppingBagIcon className="h-6 w-6" />
                    </div>
                  </Link>
                  <div className="relative">
                    <Dropdown>
                      <Dropdown.Trigger>
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img src={auth.user.avatar} alt={auth.user.name} />
                          </div>
                        </div>
                      </Dropdown.Trigger>

                      <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")} as="button">
                          Profile
                        </Dropdown.Link>
                        <Dropdown.Link href={route("order.index")} as="button">
                          Order History
                        </Dropdown.Link>
                        <Dropdown.Link
                          href={route("logout")}
                          method="post"
                          as="button"
                        >
                          Log Out
                        </Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <div className="ml-3 space-x-4">
                  <Link
                    href={route("login")}
                    className="btn-outline btn-primary btn-sm btn"
                    as="button"
                  >
                    Login
                  </Link>
                  <Link
                    href={route("register")}
                    className="btn-primary btn-sm btn text-white"
                    as="button"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                name="Dropdown Menu"
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState
                  )
                }
                className="inline-flex items-center justify-center rounded-md p-2  transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
          }
        >
          <div className="space-y-1 pt-2 pb-3">
            <ResponsiveNavLink
              href={route("home")}
              active={route().current("home")}
            >
              Home
            </ResponsiveNavLink>
            <ResponsiveNavLink
              href={route("product.index")}
              active={route().current("product.index")}
            >
              Products
            </ResponsiveNavLink>
            <ResponsiveNavLink
              href={route("design.index")}
              active={route().current("design.index")}
            >
              Design
            </ResponsiveNavLink>
          </div>

          <div className="border-t pt-4 pb-1">
            {auth?.user ? (
              <>
                <div className="px-4">
                  <div className="text-base font-medium">{auth?.user.name}</div>
                  <div className="text-sm font-medium text-gray-500">
                    {auth?.user.email}
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <ResponsiveNavLink
                    href={route("cart.index")}
                    active={route().current("cart.index")}
                    as="button"
                    className="flex items-center justify-between"
                  >
                    <div className="indicator">
                      <span>Cart</span>
                      {cartCount > 0 && (
                        <span className="text-secondary">({cartCount})</span>
                      )}
                    </div>
                  </ResponsiveNavLink>
                  <ResponsiveNavLink
                    href={route("order.index")}
                    active={route().current("order.index")}
                    as="button"
                  >
                    Orders History
                  </ResponsiveNavLink>
                  <ResponsiveNavLink
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    as="button"
                  >
                    Profile
                  </ResponsiveNavLink>
                  <ResponsiveNavLink
                    method="post"
                    href={route("logout")}
                    as="button"
                  >
                    Log Out
                  </ResponsiveNavLink>
                </div>
              </>
            ) : (
              <>
                <ResponsiveNavLink href={route("login")} as="button">
                  Login
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route("register")} as="button">
                  Register
                </ResponsiveNavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      {header && (
        <header className="mt-16 shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      {/* Alert  */}
      <Alert status={flash.status} message={flash.message} />

      {/* Validation Errors */}
      {Object.keys(errors).length !== 0 && (
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2 w-full">
          {Object.values(errors).map((error, index) => (
            <div key={index} className="alert alert-error">
              <XCircleIcon className="h-6 w-6" /> <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      <main className="container m-auto my-12 max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">{children}</main>
      <footer className="mt-auto p-10 border-t shadow-xl bg-base-300">
        <div className="footer mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div>
            <ApplicationLogo className="block h-10 w-auto fill-current" />
            <p>
              Orbit Trust Corps.
              <br />
              Percetakan & Digital Printing
            </p>
            <SocialMediaLink />
          </div>
          <div>
            <span className="footer-title">Services</span>
            <Link href={route("product.index")} className="link-hover link">
              Products
            </Link>
            <Link href={route("design.index")} className="link-hover link">
              Design
            </Link>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <Link href={route("page.about")} className="link-hover link">
              About Us
            </Link>
            <Link href={route("page.contact")} className="link-hover link">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
