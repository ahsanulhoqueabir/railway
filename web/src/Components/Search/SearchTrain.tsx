import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { TrainData } from "@/interfaces/search";

const SearchTrain: React.FC<{
  allTrains: TrainData[];
  value: string;
  setValue: (value: string) => void;
}> = ({ allTrains, value, setValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit min-w-56 justify-between"
        >
          {value
            ? `${
                allTrains.find((Train: TrainData) => Train.id === value)?.name
              } (${
                allTrains.find((Train: TrainData) => Train.id === value)
                  ?.train_number
              })`
            : "Select Train..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Train found.</CommandEmpty>
            <CommandGroup>
              {allTrains.map((train) => (
                <CommandItem
                  key={train.id}
                  value={train.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {train.name} ({train.train_number})
                  <Check
                    className={cn(
                      "ml-auto",
                      value === train.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchTrain;
