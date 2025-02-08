"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface PathfindingVisualizerProps {
  initialMaze: boolean[][]
}

const PathfindingVisualizer: React.FC<PathfindingVisualizerProps> = ({ initialMaze }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [maze, setMaze] = useState<boolean[][]>(initialMaze)
  const [path, setPath] = useState<[number, number][]>([])
  const [visitedCells, setVisitedCells] = useState<[number, number][]>([])
  const [start, setStart] = useState<[number, number] | null>(null)
  const [end, setEnd] = useState<[number, number] | null>(null)
  const [algorithm, setAlgorithm] = useState("BFS")

  useEffect(() => {
    drawMaze()
  }, [maze, start, end])

  useEffect(() => {
    drawPath()
  }, [path, visitedCells])

  const drawMaze = () => {
    const canvas = canvasRef.current
    if (!canvas || maze.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellSize = Math.min(canvas.width / maze[0].length, canvas.height / maze.length)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        ctx.fillStyle = maze[y][x] ? "black" : "white"
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }

    if (start) {
      ctx.fillStyle = "blue"
      ctx.fillRect(start[0] * cellSize, start[1] * cellSize, cellSize, cellSize)
    }
    if (end) {
      ctx.fillStyle = "red"
      ctx.fillRect(end[0] * cellSize, end[1] * cellSize, cellSize, cellSize)
    }
  }

  const drawPath = () => {
    const canvas = canvasRef.current
    if (!canvas || maze.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellSize = Math.min(canvas.width / maze[0].length, canvas.height / maze.length)

    ctx.fillStyle = "rgba(0, 0, 255, 0.3)"
    for (const [x, y] of visitedCells) {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }

    ctx.fillStyle = "rgba(0, 255, 0, 0.8)"
    for (const [x, y] of path) {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
  }

  const bfs = async () => {
    if (!start || !end || maze.length === 0) return

    const queue: [number, number][] = [start]
    const visited: boolean[][] = maze.map((row) => row.map(() => false))
    const parent: ([number, number] | null)[][] = maze.map((row) => row.map(() => null))
    visited[start[1]][start[0]] = true

    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
    ]

    let found = false
    let visitedOrder: [number, number][] = []

    while (queue.length > 0) {
      const [x, y] = queue.shift()!
      visitedOrder.push([x, y])
      setVisitedCells([...visitedOrder])
      await new Promise((resolve) => setTimeout(resolve, 50))

      if (x === end[0] && y === end[1]) {
        found = true
        break
      }

      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && nx < maze[0].length && ny >= 0 && ny < maze.length && !maze[ny][nx] && !visited[ny][nx]) {
          queue.push([nx, ny])
          visited[ny][nx] = true
          parent[ny][nx] = [x, y]
        }
      }
    }

    if (found) {
      const path: [number, number][] = []
      let current: [number, number] | null = end
      while (current) {
        path.unshift(current)
        current = parent[current[1]][current[0]]
      }
      setPath(path)
    } else {
      setPath([])
    }
  }

  const dfs = () => {
    if (!start || !end || maze.length === 0) return

    const stack: [number, number][] = [start]
    const visited: boolean[][] = maze.map((row) => row.map(() => false))
    const parent: ([number, number] | null)[][] = maze.map((row) => row.map(() => null))
    visited[start[1]][start[0]] = true

    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
    ]

    while (stack.length > 0) {
      const [x, y] = stack.pop()!
      setVisitedCells((prev) => [...prev, [x, y]])

      if (x === end[0] && y === end[1]) break

      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && nx < maze[0].length && ny >= 0 && ny < maze.length && !maze[ny][nx] && !visited[ny][nx]) {
          stack.push([nx, ny])
          visited[ny][nx] = true
          parent[ny][nx] = [x, y]
        }
      }
    }
  }

  const aStar = () => {
    // yet to implement
  }

  const findPath = () => {
    if (algorithm === "BFS") bfs()
    else if (algorithm === "DFS") dfs()
    else if (algorithm === "A*") aStar()
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const cellSize = Math.min(canvas.width / maze[0].length, canvas.height / maze.length)
    const x = Math.floor((event.clientX - rect.left) / cellSize)
    const y = Math.floor((event.clientY - rect.top) / cellSize)

    if (!start) {
      setStart([x, y])
    } else if (!end) {
      setEnd([x, y])
    } else {
      setMaze((prevMaze) => {
        const newMaze = prevMaze.map((row) => [...row])
        newMaze[y][x] = !newMaze[y][x]
        return newMaze
      })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={500} height={500} className="border border-gray-300 mb-4" onClick={handleCanvasClick}></canvas>
      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="mb-2 p-1 border">
        <option value="BFS">BFS</option>
        <option value="DFS">DFS</option>
        <option value="A*">A*</option>
      </select>
      <Button onClick={findPath} disabled={!start || !end}>Find Path</Button>
    </div>
  )
}

export default PathfindingVisualizer
