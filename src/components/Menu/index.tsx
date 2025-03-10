"use client";
import Link from "next/link";
import { useState } from "react";
type MenuProps = "jogar" | "ranking";

const menu = {
  jogar: ["Soma", "Subtração", "Multiplicação", "Divisão"],
  ranking: ["Soma", "Subtração", "Multiplicação", "Divisão"],
}


const Menu = () => {
  const [subMenu, setSubMenu] = useState(false);
  const [menuStatus, setMenuStatus] = useState<MenuProps>("jogar");

  const SubMenu = ({ menuStatus }: { menuStatus: MenuProps }) => {

    return (
      <div className="grid">
        {
          menu[menuStatus].map((item: string, index: number) => (
            <Link href="/game" key={index}>
              <span className="text-2xl font-bold text-centerc">{item}</span>
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
                setMenuStatus("jogar");
              }}
            >
              Jogar
            </span>
            <span 
              className="text-2xl font-bold text-centerc"
              onClick={() => {
                setSubMenu(true);
                setMenuStatus("jogar");
              }}
            >
              Ranking
            </span>
          </div>
        )
      }
      {
        subMenu && (
          <SubMenu menuStatus={menuStatus}/>
        )
      }

      
    </div>
  )
}



export default Menu;