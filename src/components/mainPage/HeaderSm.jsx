'use client'

import SearchInput from "../ui/SearchInput"
import OptionButton from "../ui/OptionButton"
import { Globe, Menu, Search } from "lucide-react"

const HeaderSm = () => {
  return (
    <div className="w-full bg-white px-4 pt-2 pb-3 flex flex-col gap-3">
      
      {/* 1. Верхняя строчка: твой SearchInput + кнопка фильтров */}
      <div className="w-full flex items-center gap-2">
        <div className="flex-1">
          <SearchInput 
            value="" 
            onChange={() => {}} 
            placeholder="Поиск направлений..." 
          />
        </div>

       
      </div>

      {/* 2. Горизонтальный незаметный скролл с OptionButton */}
      <div className="w-full overflow-x-auto no-scrollbar flex items-center gap-3 justify-start py-1 px-1">
        <OptionButton onClick={() => {}} icon={<Globe className="h-5 w-5" />}>
          Click Me 1
        </OptionButton>
        <OptionButton onClick={() => {}} icon={<Menu className="h-5 w-5" />}>
          Click Me 2
        </OptionButton>
        <OptionButton onClick={() => {}} icon={<Search className="h-5 w-5" />}>
          Click Me 3
        </OptionButton>
        <OptionButton onClick={() => {}} icon={<Search className="h-5 w-5" />}>
          Click Me 4
        </OptionButton>
      </div>

    </div>
  )
}

export default HeaderSm