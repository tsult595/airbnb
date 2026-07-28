import { ArrowRight } from "lucide-react"
import RecommendedInput from "../ui/RecommendedInput"

const RecommendedCities = () => {
  return (
    <div className="w-full flex justify-between gap-4">
      <ArrowRight className="h-5 w-5 text-gray-500" /> 
      <RecommendedInput />
    </div>
  )
}

export default RecommendedCities