import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ProductBottomBar({
  isSaving,
  saveLabel = "Salvar",
  cancelHref,
}: {
  isSaving: boolean
  saveLabel?: string
  cancelHref: string
}) {
  return (
    <div className="sticky bottom-0 z-10 mt-6 flex items-center justify-end gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur">
      <Button
        variant="outline"
        type="button"
        nativeButton={false}
        render={<Link href={cancelHref} />}
      >
        Cancelar
      </Button>
      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Salvando..." : saveLabel}
      </Button>
    </div>
  )
}
