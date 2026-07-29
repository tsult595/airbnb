import { ArrowRight, Filter } from "lucide-react"
import RecommendedInput from "../ui/RecommendedInput"

const RecommendedCities = () => {
  return (
    <div className="w-full flex justify-between gap-4">
      <ArrowRight className="h-5 w-5 text-gray-500" /> 
      <RecommendedInput />
      <Filter className="h-5 w-5 text-gray-500" />
    </div>
  )
}

export default RecommendedCities