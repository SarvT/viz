import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AlgorithmSelectorProps {
  onSelect: (algorithm: string) => void
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ onSelect }) => {
  return (
    <div className="m-4">
    <Select onValueChange={onSelect} defaultValue="binaryTree">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Algorithm" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="binaryTree">Binary Tree</SelectItem>
        {/* It's yet to be added */}
        {/* <SelectItem value="tree">Tree</SelectItem> */}
        
        <SelectItem value="pathfinding">Pathfinding</SelectItem>
        <SelectItem value="sorting">Sorting</SelectItem>
      </SelectContent>
    </Select>
    </div>
  )
}

export default AlgorithmSelector

