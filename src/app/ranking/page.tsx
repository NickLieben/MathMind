"use client";
import React, { useEffect, useState } from "react";
import useControllGame, { GameRanking } from "../hooks/useControllGame";
import Link from "next/link";

const RankingScreen = () => {

  const [ranking, setRanking] = useState<GameRanking[]>([]);

  const { getRanking } = useControllGame();

  const populateRanking = () => {
    const ranking = getRanking();

    setRanking(ranking.slice(0, 10));
  }

  useEffect(() => {
    populateRanking();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-4">
      <div className="w-full max-w-2xl">
      <div className="flex justify-between mb-4">
          <Link href="/" className="text-black underline">Voltar</Link>
          <Link href="/game" className="text-black underline">Jogar</Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Ranking</h1>
        <div className="border border-black rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-3 border border-black">Posição</th>
                <th className="p-3 border border-black">Nome</th>
                <th className="p-3 border border-black">Pontuação</th>
                <th className="p-3 border border-black">Tempo</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((player, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                  <td className="p-3 border border-black text-center">{index + 1}</td>
                  <td className="p-3 border border-black">{player.user}</td>
                  <td className="p-3 border border-black text-center">{player.points}</td>
                  <td className="p-3 border border-black text-center">{player.gameTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RankingScreen;
