import { useState } from "react";
import { Problem } from "../types/Problem"


export default function useSaveGame() {
  const [user, setUser] = useState("Nick")
  const getPoints = (problems: Problem[]) => {
    return problems.reduce((acc, problem) => acc + (problem.isCorrect ? 1 : 0), 0)
  }

  const saveGame = (problems: Problem[], gameTime: number) => {
    const points = getPoints(problems)
    const ranking = localStorage.getItem("ranking")
    const gameToSave = {
      user,
      points,
      gameTime,
    }

    const newRanking = [...(ranking ? JSON.parse(ranking) : []), gameToSave]

    const sortedRanking = newRanking.sort((a, b) => {
      if (a.points === b.points) {
        return a.gameTime - b.gameTime
      }
      return b.points - a.points
    })

    localStorage.setItem("ranking", JSON.stringify(sortedRanking));
  }

  return {user, setUser, saveGame}

}