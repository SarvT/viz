"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface InputFormProps {
  onSubmit: (data: number[] | boolean[][]) => void
  algorithm: string
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, algorithm }) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (algorithm === "binaryTree") {
      const numbers = input
        .split(",")
        .map((num) => Number.parseInt(num.trim()))
        .filter((num) => !isNaN(num))
      onSubmit(numbers)
    } else if (algorithm === "pathfinding") {
      const maze = input.split("\n").map((row) => row.split("").map((cell) => cell === "1"))
      onSubmit(maze)
    }
    setInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2 mb-4">
      {algorithm === "binaryTree" ? (
        <Input
          type="text"
          placeholder="Enter numbers (e.g., 5,3,7,2,8)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        <Textarea
          placeholder="Enter maze (0 for path, 1 for wall, e.g.:
00100
01110
00100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-32"
        />
      )}
      <Button type="submit">Visualize</Button>
    </form>
  )
}

export default InputForm

