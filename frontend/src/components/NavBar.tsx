"use client";
import { useAuthStore } from "@src/app/store/authStore";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-green-300 p-4 mb-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-black text-xl font-bold">
          Todo App
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/todo" className="text-black hover:text-indigo-200">
                Todos
              </Link>
              <button
                onClick={logout}
                className="text-black hover:text-indigo-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-black hover:text-indigo-200">
                Login
              </Link>
              <Link
                href="/register"
                className="text-black hover:text-indigo-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
