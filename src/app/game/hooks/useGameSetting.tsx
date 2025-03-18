import { useEffect, useRef, useState } from "react"
import { Problem } from "../types/Problem"
import GenerateProblems from "../utils/generateProblems"
import useControllGame from "../../hooks/useControllGame"
import { OperationsType } from "@/app/types/operations"

type GameState = "ready" | "playing" | "finished"

export default function useUser(gameType: OperationsType) {
  const MAX_PROBLEMS = 10
  
  const [problems, setProblems] = useState<Problem[]>([])
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [gameTime, setGameTime] = useState<number | null>(null)
  const [gameState, setGameState] = useState<GameState>("ready")
  const [userAnswer, setUserAnswer] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const { saveGame, setUser, user } = useControllGame()
  

  const startGame = () => {
    setProblems(GenerateProblems({gameType, maxProblems: MAX_PROBLEMS}))
    setCurrentProblemIndex(0)
    setStartTime(Date.now())
    setGameState("playing")
    setUserAnswer("")
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const getCorrectAnswer = (gameType: OperationsType, problem: Problem): number => {
    switch (gameType) {
      case "addition":
        return problem.num1 + problem.num2
      case "subtraction":
        return problem.num1 - problem.num2
      case "multiplication":
        return problem.num1 * problem.num2
      case "division":
        return problem.num1 / problem.num2
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (gameState !== "playing") return

    const currentProblem = problems[currentProblemIndex]
    const correctAnswer = getCorrectAnswer(gameType, currentProblem)
    const isCorrect = Number.parseInt(userAnswer) === correctAnswer

    // Update the current problem with user's answer
    const updatedProblems = [...problems]
    updatedProblems[currentProblemIndex] = {
      ...currentProblem,
      userAnswer,
      isCorrect,
    }
    setProblems(updatedProblems)

    // Move to next problem or finish
    if (currentProblemIndex < MAX_PROBLEMS - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1)
      setUserAnswer("")
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else {
      const end = Date.now()
      setEndTime(Date.now())
      setGameState("finished")
      setGameTime(formatTime(end! - startTime!))
      saveGame(updatedProblems, formatTime(end! - startTime!))
    }
  }

  const resetGame = () => {
    setGameState("ready")
    setProblems([])
    setCurrentProblemIndex(0)
    setStartTime(null)
    setEndTime(null)
    setUserAnswer("")
  }

  const formatTime = (timeInMs: number): number => {
    return Number((timeInMs / 1000).toFixed(2))
  }

  useEffect(() => {
    if (gameState === "playing") {
      inputRef.current?.focus()
    }
  }, [gameState, currentProblemIndex])

  return {
    problems,
    currentProblemIndex,
    startTime,
    endTime,
    gameState,
    userAnswer,
    gameTime,
    setUserAnswer,
    startGame,
    resetGame,
    handleSubmit,
    MAX_PROBLEMS,
    inputRef,
    setUser,
    user,
  }
}