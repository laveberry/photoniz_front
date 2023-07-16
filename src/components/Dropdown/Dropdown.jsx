import React, { useState, useEffect } from "react";

function DropDown (){
    return (
        <ul >
  {
    Array(3).fill('').map((li, i) => (
      <li onClick={() => console.log(`Dropdown${i + 1}`)}>Dropdown{i + 1}</li>
    ))
  }
</ul>
    )
}

export default DropDown;