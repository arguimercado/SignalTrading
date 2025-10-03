"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useState, useMemo } from "react"
import { Controller } from "react-hook-form"
import countryList from 'react-select-country-list'
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

const CountrySelectField = ({name, control, label, error, required, placeholder}: CountryFieldProps) => {
   
   const options = useMemo(() => countryList().getData(), [])
   const [open, setOpen] = useState(false)
   
   // Function to get country flag emoji
   const getCountryFlag = (countryCode: string) => {
     if (!countryCode || countryCode.length !== 2) return "🌍"
     
     const codePoints = countryCode
       .toUpperCase()
       .split('')
       .map(char => 127397 + char.charCodeAt(0))
     
     return String.fromCodePoint(...codePoints)
   }
   
   return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-200">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
        }}
        render={({ field }) => {
          const selectedCountry = options.find((option) => option.value === field.value)
          
          return (
            <div className="relative">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between bg-gray-800/50 border-gray-600 text-gray-200 hover:bg-gray-700/50 hover:border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200",
                      !field.value && "text-gray-400"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {selectedCountry ? (
                        <>
                          <span className="text-lg">{getCountryFlag(selectedCountry.value)}</span>
                          <span className="truncate">{selectedCountry.label}</span>
                        </>
                      ) : (
                        <>
                          <Globe className="h-4 w-4 opacity-50" />
                          <span>{placeholder}</span>
                        </>
                      )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-gray-800/95 border-gray-600 backdrop-blur-sm">
                  <Command className="bg-transparent">
                    <CommandInput 
                      placeholder="Search countries..." 
                      className="border-gray-600 text-gray-200 placeholder:text-gray-400"
                    />
                    <CommandList className="max-h-[300px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      <CommandEmpty className="text-gray-400 py-6">
                        No country found.
                      </CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            onSelect={() => {
                              field.onChange(option.value)
                              setOpen(false)
                            }}
                            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-700/50 text-gray-200 data-[selected=true]:bg-blue-600/20 data-[selected=true]:text-blue-300"
                          >
                            <span className="text-lg">{getCountryFlag(option.value)}</span>
                            <span className="flex-1 truncate">{option.label}</span>
                            <Check
                              className={cn(
                                "h-4 w-4 text-blue-400",
                                option.value === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {error && (
                <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {error.message}
                </p>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}
export default CountrySelectField