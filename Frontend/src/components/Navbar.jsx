import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="border flex justify-center">
        <a href="/" className="border px-8">
          Home
        </a>
        <a href="/" className="border px-8">
          Network
        </a>
        <a href="/message" className="border px-8">
          Message
        </a>
        <a href="/" className="border px-8">
          Setting
        </a>
      </div>
    </>
  );
}
