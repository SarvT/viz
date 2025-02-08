import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AlgorithmSelectorProps {
  onSelect: (algorithm: string) => void
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ onSelect }) => {
  return (
    <Select onValueChange={onSelect} defaultValue="binaryTree">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Algorithm" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="binaryTree">Binary Tree</SelectItem>
        {/* It's yet to be added */}
        {/* <SelectItem value="tree">Tree</SelectItem> */}
        
        <SelectItem value="pathfinding">Pathfinding</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default AlgorithmSelector

