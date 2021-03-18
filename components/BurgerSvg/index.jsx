import React from "react";

function BurgerSvg({color, stroke, opacity}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.7 43.4">
      <path
        fill={color}
        opacity={opacity}
        stroke={stroke}
        strokeMiterlimit="10"
        d="M4.6 19.8c0-9.2 10.1-16.7 22.5-16.7s22.5 7.5 22.5 16.7h-45zM49 28.1H5.1c-.3 0-.6-.3-.6-.6V23c0-.4.3-.6.6-.6H49c.3 0 .6.3.6.6v4.5c0 .3-.3.6-.6.6zm-.1 11H5.2c-.3 0-.6-.3-.6-.7v-7.2c0-.3.2-.5.5-.5h44.1c.3 0 .5.2.5.5v7.2c-.1.4-.4.7-.8.7z"
      ></path>
    </svg>
  );
}

export default BurgerSvg;
