import { DribbbleIcon, InstagramIcon, LinkedinIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

import Logo from "@/components/Logo"

const footerLinks = [
  { to: "/", label: "Projects", end: true },
  { to: "/about", label: "About" },
]

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/alwyn-leedham-36383556/",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "https://www.instagram.com/alwyn.design",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://dribbble.com/AlwynDesign",
    label: "Dribbble",
    icon: DribbbleIcon,
  },
]

function Footer() {
  return (
    <footer className="px-4 pb-6 pt-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 px-1 py-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-auto text-slate-900 dark:text-slate-50" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Alwyn Leedham
          </p>
        </div>

        <nav className="flex items-center justify-start gap-4 text-sm md:justify-center">
          {footerLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground transition hover:text-foreground"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-start gap-2 md:justify-end">
          {socialLinks.map((link) => {
            const Icon = link.icon

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="rounded-full p-2 text-muted-foreground transition hover:bg-muted/70 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
