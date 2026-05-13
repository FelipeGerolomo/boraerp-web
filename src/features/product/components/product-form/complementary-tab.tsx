import {
  Award,
  FolderTree,
  Heading,
  Link2,
  Tags,
  Text,
  Video,
} from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { TextInput } from "./form-fields"
import type { ProductFormTabProps } from "./types"

export function ProductComplementaryTab({
  values,
  setValue,
}: ProductFormTabProps) {
  return (
    <div className="flex flex-col gap-8">
      <FieldSet>
        <FieldLegend>Catalogação</FieldLegend>
        <FieldDescription>
          Classifica o produto no catálogo por categoria e marca.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Categoria</FieldLabel>
              <TextInput
                value={values.categoryId}
                onChange={(value) => setValue("categoryId", value)}
                placeholder="ID ou código da categoria"
                startAddon={<FolderTree />}
              />
            </Field>

            <Field>
              <FieldLabel>Marca</FieldLabel>
              <TextInput
                value={values.brandName}
                onChange={(value) => setValue("brandName", value)}
                placeholder="Ex.: Acme"
                startAddon={<Award />}
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Descrições</FieldLegend>
        <FieldDescription>
          Textos descritivos exibidos na loja e em integrações.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel>Descrição complementar</FieldLabel>
            <Textarea
              value={values.description}
              onChange={(event) => setValue("description", event.target.value)}
              placeholder="Descreva o produto em detalhes"
              rows={4}
            />
          </Field>

          <Field>
            <FieldLabel>Resumo</FieldLabel>
            <Textarea
              value={values.shortDescription}
              onChange={(event) =>
                setValue("shortDescription", event.target.value)
              }
              placeholder="Resumo curto do produto"
              rows={3}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>SEO e mídia</FieldLegend>
        <FieldDescription>
          Informações usadas em buscadores, na URL da loja e em conteúdo
          multimídia.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Link do vídeo</FieldLabel>
              <TextInput
                type="url"
                value={values.videoUrl}
                onChange={(value) => setValue("videoUrl", value)}
                placeholder="https://"
                startAddon={<Video />}
              />
            </Field>

            <Field>
              <FieldLabel>Slug</FieldLabel>
              <TextInput
                value={values.slug}
                onChange={(value) => setValue("slug", value)}
                placeholder="ex.: camiseta-basica-azul"
                startAddon={<Link2 />}
              />
            </Field>
          </div>

          <Field>
            <FieldLabel>Keywords</FieldLabel>
            <TextInput
              value={values.keywords}
              onChange={(value) => setValue("keywords", value)}
              placeholder="palavra-chave 1, palavra-chave 2"
              startAddon={<Tags />}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel>Título para SEO</FieldLabel>
              <TextInput
                value={values.seoTitle}
                onChange={(value) => setValue("seoTitle", value)}
                placeholder="Título exibido nos buscadores"
                startAddon={<Heading />}
              />
            </Field>

            <Field>
              <FieldLabel>Descrição para SEO</FieldLabel>
              <TextInput
                value={values.seoDescription}
                onChange={(value) => setValue("seoDescription", value)}
                placeholder="Resumo exibido nos buscadores"
                startAddon={<Text />}
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Imagens e tags</FieldLegend>
        <FieldDescription>
          Recursos que serão disponibilizados em breve.
        </FieldDescription>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel>Imagens/anexos</FieldLabel>
            <FieldDescription>
              Upload de imagens ainda não disponível nesta versão. Em breve será
              possível anexar arquivos do produto.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Tags</FieldLabel>
            <FieldDescription>
              Gerenciamento de tags será integrado quando o endpoint de tags
              estiver disponível.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
