"use client";
import { OPERATIONS } from "@/app/constants/operations";
import Link from "next/link";
import { useState } from "react";


const Menu = () => {
  const [subMenu, setSubMenu] = useState(false);

  const SubMenu = () => {
    return (
      <div className="grid">
        {
          OPERATIONS.map((item, index: number) => (
            <Link href={`/game?gameType=${item.id}`} key={index}>
              <span className="text-2xl font-bold text-centerc">{item.title}</span>
            </Link>
            
          ))
        }
        <span onClick={() => setSubMenu(false)} className="mt-8 text-2xl font-bold text-centerc">Voltar</span>
      </div>
    )
  }

  return (
    <div className="border-2 border-solid border-black py-12 px-32">
      <div className="grid border-b-2 border-solid border-black mb-8">
        <span className="text-4xl font-bold text-center">Menu</span>
      </div>

      {
        !subMenu && (
          <div className="grid">
            
            <span 
              className="text-2xl font-bold text-centerc"
              onClick={() => {
                setSubMenu(true);
              }}
            >
              Jogar
            </span>
            <Link href="/ranking">
              <span 
                className="text-2xl font-bold text-centerc"
              >
                Ranking
              </span>
            </Link>
          </div>
        )
      }
      {
        subMenu && (
          <SubMenu />
        )
      }

      
    </div>
  )
}



export default Menu;