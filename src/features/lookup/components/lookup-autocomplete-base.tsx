"use client"

import { useMemo, useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { LookupOption } from "@/features/lookup/types/lookup-types"

type LookupAutocompleteBaseProps<TValue extends string | number> = {
  options: LookupOption<TValue>[]
  value?: TValue
  onChange: (value: TValue | undefined) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  loading?: boolean
  clearable?: boolean
  errorMessage?: string
  onRetry?: () => void
}

export function LookupAutocompleteBase<TValue extends string | number>({
  options,
  value,
  onChange,
  placeholder = "Selecione",
  searchPlaceholder = "Buscar...",
  emptyText = "Nenhum resultado encontrado.",
  disabled,
  loading,
  clearable = true,
  errorMessage,
  onRetry,
}: LookupAutocompleteBaseProps<TValue>) {
  const [open, setOpen] = useState(false)

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  )

  const canClear = clearable && value != null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between"
            disabled={disabled || loading}
          />
        }
      >
        <span
          className={cn(
            "truncate",
            !selectedOption && "text-muted-foreground",
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDownIcon data-icon="inline-end" className="opacity-50" />
      </PopoverTrigger>

      <PopoverContent className="w-(--anchor-width) p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            {errorMessage ? (
              <div className="flex flex-col gap-2 p-3 text-sm">
                <p className="text-destructive">{errorMessage}</p>
                {onRetry && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                  >
                    Tentar novamente
                  </Button>
                )}
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {loading ? "Carregando opções..." : emptyText}
                </CommandEmpty>

                {canClear && (
                  <CommandGroup>
                    <CommandItem
                      value="__clear__"
                      onSelect={() => {
                        onChange(undefined)
                        setOpen(false)
                      }}
                    >
                      Limpar seleção
                    </CommandItem>
                  </CommandGroup>
                )}

                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = option.value === value

                    return (
                      <CommandItem
                        key={String(option.value)}
                        value={`${option.label} ${option.description ?? ""}`}
                        data-checked={isSelected}
                        onSelect={() => {
                          onChange(option.value)
                          setOpen(false)
                        }}
                      >
                        <span className="truncate" title={option.label}>
                          {option.label}
                        </span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
