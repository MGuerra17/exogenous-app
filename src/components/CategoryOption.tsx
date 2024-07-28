import { CheckIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function CategoryOption({ name, color, active, onPress }: { name: string, color: string, active?: boolean, onPress?: () => void }) {
  return (
    <Button variant="outline" size="lg" className={active ? "border-black" : ""} onClick={onPress}>
      <div className="flex items-center w-full justify-start gap-2">
        <div className={`w-4 aspect-square rounded-full ${color}`} />
        {name}
      </div>
      {active && (
        <div className="absolute bg-black -top-2 -right-2 border-2 border-white rounded-full p-1">
          <CheckIcon className="h-3 w-3 text-white" />
        </div>
      )}
    </Button>
  )
}