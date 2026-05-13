import type { InputHTMLAttributes, ReactNode } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

type Addons = {
  /** Leading addon, usually an icon. */
  startAddon?: ReactNode
  /** Trailing addon, usually a unit symbol (kg, cm, %, ...). */
  endAddon?: ReactNode
}

function Addoned({
  startAddon,
  endAddon,
  children,
}: Addons & { children: ReactNode }) {
  return (
    <InputGroup>
      {startAddon ? <InputGroupAddon>{startAddon}</InputGroupAddon> : null}
      {children}
      {endAddon ? (
        <InputGroupAddon align="inline-end">{endAddon}</InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export function TextInput({
  value,
  onChange,
  startAddon,
  endAddon,
  ...inputProps
}: Addons & {
  value: string
  onChange: (value: string) => void
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type"
  > & { type?: string }) {
  return (
    <Addoned startAddon={startAddon} endAddon={endAddon}>
      <InputGroupInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...inputProps}
      />
    </Addoned>
  )
}

export function NumberInput({
  value,
  onChange,
  placeholder,
  startAddon,
  endAddon,
  step = "0.01",
  min = "0",
}: Addons & {
  value?: number
  onChange: (value?: number) => void
  placeholder?: string
  step?: string
  min?: string
}) {
  return (
    <Addoned startAddon={startAddon} endAddon={endAddon}>
      <InputGroupInput
        type="number"
        step={step}
        min={min}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(event) => {
          const next = event.target.value
          onChange(next === "" ? undefined : Number(next))
        }}
      />
    </Addoned>
  )
}
