import React from "react";
import { navLinks } from "../utils/navLinks";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="brand">
        <Link href="/">
          <a className="text-2xl font-bold text-green-500">Farrabs Wedding</a>
        </Link>
      </div>
      <nav>
        <ul>
          {navLinks.map((link, index) => {
            return (
              <li key={index}>
                <Link href={link.path}>
                  <a className="text-2xl">{link.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
