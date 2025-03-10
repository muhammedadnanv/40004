
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedDifficulty: string | null;
  setSelectedDifficulty: (difficulty: string | null) => void;
  categories: string[];
  difficulties: string[];
  resetFilters: () => void;
}

export const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  categories,
  difficulties,
  resetFilters
}: SearchFiltersProps) => {
  return (
    <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="search-input"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="whitespace-nowrap text-xs sm:text-sm py-2 px-3"
          >
            Reset filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDifficulty(null)}
            className={`whitespace-nowrap text-xs sm:text-sm py-2 px-3 ${selectedDifficulty === null ? 'bg-primary/10' : ''}`}
          >
            All Difficulties
          </Button>
          {difficulties.map(difficulty => (
            <Button
              key={difficulty}
              variant="outline"
              size="sm"
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`whitespace-nowrap text-xs sm:text-sm py-2 px-3 ${selectedDifficulty === difficulty ? 'bg-primary/10' : ''}`}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={`whitespace-nowrap text-xs sm:text-sm py-2 px-3 ${selectedCategory === null ? 'bg-primary/10' : ''}`}
        >
          <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> All Categories
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap text-xs sm:text-sm py-2 px-3 ${selectedCategory === category ? 'bg-primary/10' : ''}`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};
