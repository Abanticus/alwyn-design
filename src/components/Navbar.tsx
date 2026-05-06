import { useState } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"
import { NavLink } from "react-router-dom"

import Logo from "@/components/Logo"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const navItems = [
  { to: "/", label: "Projects", end: true },
  { to: "/about", label: "About" },
]


function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const closeMenu = () => {
    setIsOpen(false)
  }

  const isDarkMode = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto max-w-6xl border border-border/70 bg-background/88 backdrop-blur transition-all ${
          isOpen ? "rounded-3xl" : "rounded-3xl md:rounded-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:h-18 sm:gap-6 sm:px-6">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className="group flex items-center"
          >
            <span className="flex h-10 items-center justify-center overflow-hidden sm:h-11">
              <Logo className="h-8 w-auto text-slate-900 dark:text-slate-50 sm:h-9" />
            </span>
          </NavLink>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-border/80 px-4 pb-4 pt-3 md:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
