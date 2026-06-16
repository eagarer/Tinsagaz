"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import styles from "./Navbar.module.css";
import { gasesData } from "../app/urunler/gazlar/sinai-gazlar/gasesData";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  {
    href: "/urunler",
    label: "Ürünler",
    dropdown: [
      {
        label: "Sınai Gazlar",
        href: "/urunler/gazlar/sinai-gazlar",
        submenu: gasesData.map((gas) => ({
          href: `/urunler/gazlar/sinai-gazlar/${gas.slug}`,
          label: gas.title,
        })),
      },
    ],
  },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileSinaiOpen, setMobileSinaiOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileDropdownOpen(false);
    setMobileSinaiOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`${styles.navbar} ${
          scrolled ? styles.navbarScrolled : styles.navbarTransparent
        }`}
        role="navigation"
        aria-label="Ana navigasyon"
      >
        <div className={styles.navbarInner}>
          {/* Logo */}
          <Link href="/" className={styles.navbarLogo} aria-label="Tinsagaz Anasayfa">
            <Image
              src="/logo-tinsagaz.png"
              alt="Tinsagaz Logo"
              width={140}
              height={48}
              className={styles.navbarLogoImg}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <ul className={styles.navbarMenu} role="list">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className={`${styles.navbarItem} ${link.dropdown ? styles.hasDropdown : ""}`}
              >
                {link.dropdown ? (
                  <>
                    <Link
                      href={link.href}
                      id={`nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                      className={`${styles.navbarLink} ${
                        scrolled ? styles.navbarLinkScrolled : ""
                      } ${
                        pathname.startsWith(link.href)
                          ? scrolled
                            ? styles.activeScrolled
                            : styles.active
                          : ""
                      }`}
                    >
                      {link.label}
                      <span className={styles.dropdownArrow}>▼</span>
                    </Link>
                    <ul className={styles.dropdownMenu} role="list">
                      {link.dropdown.map((subItem) => (
                        <li key={subItem.label} className={styles.dropdownItem}>
                          <Link href={subItem.href} className={styles.dropdownLink}>
                            {subItem.label}
                            <span className={styles.submenuArrow}>▶</span>
                          </Link>
                          <ul className={styles.submenuMenu} role="list">
                            {subItem.submenu.map((nested) => (
                              <li key={nested.href}>
                                <Link href={nested.href} className={styles.submenuLink}>
                                  {nested.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    id={`nav-link-${link.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                    className={`${styles.navbarLink} ${
                      scrolled ? styles.navbarLinkScrolled : ""
                    } ${
                      pathname === link.href
                        ? scrolled
                          ? styles.activeScrolled
                          : styles.active
                        : ""
                    } ${link.href === "/iletisim" ? styles.navbarCta : ""}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            id="navbar-hamburger-btn"
            className={`${styles.navbarHamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="navbar-mobile-menu"
        className={`${styles.navbarMobile} ${menuOpen ? styles.open : ""}`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <div key={link.label} className={styles.mobileNavItem}>
            {link.dropdown ? (
              <>
                <button
                  className={`${styles.navbarLink} ${styles.mobileDropdownToggle} ${
                    pathname.startsWith(link.href) ? styles.active : ""
                  }`}
                  onClick={() => setMobileDropdownOpen((v) => !v)}
                  aria-expanded={mobileDropdownOpen}
                >
                  {link.label}
                  <span className={`${styles.mobileDropdownArrow} ${mobileDropdownOpen ? styles.rotated : ""}`}>
                    ▼
                  </span>
                </button>
                <div className={`${styles.mobileSubmenu} ${mobileDropdownOpen ? styles.mobileSubmenuOpen : ""}`}>
                  {link.dropdown.map((subItem) => (
                    <div key={subItem.label} className={styles.mobileSubmenuCol}>
                      <button
                        className={styles.mobileSubmenuHeaderToggle}
                        onClick={() => setMobileSinaiOpen((v) => !v)}
                        aria-expanded={mobileSinaiOpen}
                      >
                        {subItem.label}
                        <span className={`${styles.mobileSubmenuArrow} ${mobileSinaiOpen ? styles.rotated : ""}`}>
                          ▼
                        </span>
                      </button>
                      <div className={`${styles.mobileNestedMenu} ${mobileSinaiOpen ? styles.mobileNestedMenuOpen : ""}`}>
                        {subItem.submenu.map((nested) => (
                          <Link
                            key={nested.href}
                            href={nested.href}
                            className={styles.mobileNestedMenuLink}
                            onClick={() => setMenuOpen(false)}
                          >
                            {nested.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    href={link.href}
                    className={styles.mobileSubmenuLink}
                    style={{ fontWeight: "600", borderTop: "1px solid var(--gray-200)", paddingTop: "12px", marginTop: "4px" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Tüm Ürünler
                  </Link>
                </div>
              </>
            ) : (
              <Link
                href={link.href}
                className={`${styles.navbarLink} ${
                  pathname === link.href ? styles.active : ""
                } ${link.href === "/iletisim" ? styles.navbarCta : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
