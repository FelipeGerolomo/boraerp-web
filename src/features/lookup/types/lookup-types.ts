export type LookupResponse = {
  id: number
  code?: string
  name: string
  description?: string
}

export type UnitOfMeasureLookupResponse = {
  id: string
  code?: string
  name: string
  system?: boolean
}

export type LookupOption<TValue extends string | number = string> = {
  value: TValue
  code?: string
  name: string
  description?: string
  label: string
}

export function formatLookupLabel({
  code,
  name,
}: {
  code?: string
  name: string
}) {
  if (!code) {
    return name
  }

  return `${code} - ${name}`
}

export function toLookupOption(item: LookupResponse): LookupOption<string> {
  return {
    value: item.code ?? String(item.id),
    code: item.code,
    name: item.name,
    description: item.description,
    label: formatLookupLabel({ code: item.code, name: item.name }),
  }
}

export function toUnitLookupOption(
  item: UnitOfMeasureLookupResponse,
): LookupOption<string> {
  return {
    value: item.id,
    code: item.code,
    name: item.name,
    label: formatLookupLabel({ code: item.code, name: item.name }),
  }
}

export function toNumericLookupOption(item: LookupResponse): LookupOption<number> {
  return {
    value: item.id,
    code: item.code,
    name: item.name,
    description: item.description,
    label: formatLookupLabel({ code: item.code, name: item.name }),
  }
}
