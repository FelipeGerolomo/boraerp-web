import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { ProductFormTabProps } from "./types"

export function ProductComplementaryTab({ values, setValue }: ProductFormTabProps) {
  return (
    <FieldGroup className="gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Categoria</FieldLabel>
          <Input
            value={values.categoryId}
            onChange={(event) => setValue("categoryId", event.target.value)}
            placeholder="ID ou código da categoria"
          />
        </Field>

        <Field>
          <FieldLabel>Marca</FieldLabel>
          <Input
            value={values.brandName}
            onChange={(event) => setValue("brandName", event.target.value)}
          />
        </Field>
      </div>

      <Field>
        <FieldLabel>Descrição complementar</FieldLabel>
        <Textarea
          value={values.description}
          onChange={(event) => setValue("description", event.target.value)}
          rows={4}
        />
      </Field>

      <Field>
        <FieldLabel>Resumo</FieldLabel>
        <Textarea
          value={values.shortDescription}
          onChange={(event) => setValue("shortDescription", event.target.value)}
          rows={3}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Link do vídeo</FieldLabel>
          <Input
            value={values.videoUrl}
            onChange={(event) => setValue("videoUrl", event.target.value)}
            placeholder="https://"
          />
        </Field>

        <Field>
          <FieldLabel>Slug</FieldLabel>
          <Input
            value={values.slug}
            onChange={(event) => setValue("slug", event.target.value)}
          />
        </Field>
      </div>

      <Field>
        <FieldLabel>Keywords</FieldLabel>
        <Input
          value={values.keywords}
          onChange={(event) => setValue("keywords", event.target.value)}
          placeholder="palavra-chave 1, palavra-chave 2"
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Título para SEO</FieldLabel>
          <Input
            value={values.seoTitle}
            onChange={(event) => setValue("seoTitle", event.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel>Descrição para SEO</FieldLabel>
          <Input
            value={values.seoDescription}
            onChange={(event) => setValue("seoDescription", event.target.value)}
          />
        </Field>
      </div>

      <Field>
        <FieldLabel>Imagens/anexos</FieldLabel>
        <FieldDescription>
          Upload de imagens ainda não disponível nesta versão. Em breve será possível
          anexar arquivos do produto.
        </FieldDescription>
      </Field>

      <Field>
        <FieldLabel>Tags</FieldLabel>
        <FieldDescription>
          Gerenciamento de tags será integrado quando o endpoint de tags estiver
          disponível.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
