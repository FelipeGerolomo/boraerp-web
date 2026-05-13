import {
  Activity,
  Aperture,
  BarChart3,
  Bell,
  Bookmark,
  Briefcase,
  CalendarDays,
  CandlestickChart,
  CircleUser,
  CreditCard,
  Filter,
  Gauge,
  History,
  Home,
  Inbox,
  LifeBuoy,
  Link2,
  ListTodo,
  type LucideIcon,
  Newspaper,
  PieChart,
  Plus,
  Package,
  Scan,
  ScatterChart,
  Send,
  Settings,
  Shield,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Wallet,
} from "lucide-react"

/**
 * Sidebar navigation schema + configuration.
 *
 * Everything the two-level dashboard sidebar renders is described by `sidebarConfig`
 * below. To add, remove, or reorder navigation, edit the data in this file only —
 * the rendering components (`src/components/sidebar/*`) consume it generically.
 */

/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */

/** A permission key gating visibility of a nav entry. Wire to your auth layer. */
export type Permission = string

type NavEntryBase = {
  /** Text shown to the user. */
  title: string
  /** Optional leading icon. */
  icon?: LucideIcon
  /** Optional trailing badge (count or short label). */
  badge?: string | number
  /** When set, the entry renders only if the viewer holds this permission. */
  permission?: Permission
}

/**
 * A leaf entry — selecting it navigates to a route.
 *
 * `url` is auto-derived from the entry's position in the tree (see the
 * normalization pass at the bottom of this file), so you never write it by
 * hand. It is always present on leaves after the module loads.
 */
export type NavLink = NavEntryBase & {
  url?: string
}

/** A parent entry that expands to reveal child links. */
export type NavCollapsible = NavEntryBase & {
  /** Child links. The presence of this array is what makes an entry collapsible. */
  items: NavLink[]
  /** Force the group open on first render. Defaults to the first collapsible per section. */
  defaultOpen?: boolean
}

export type NavItem = NavLink | NavCollapsible

/** A labelled (or anonymous) cluster of items inside a section. */
export type NavGroup = {
  label?: string
  items: NavItem[]
}

/** The contextual second-level panel shown for one rail destination. */
export type NavSection = {
  title: string
  description: string
  groups: NavGroup[]
}

/** A first-level destination shown as an icon in the rail. */
export type RailItem = NavEntryBase & {
  /** Key into `sidebarConfig.sections` — the panel this rail item opens. */
  section: string
}

export type SidebarConfig = {
  /** Brand mark pinned to the top of the rail. */
  brand: { icon: LucideIcon; title: string }
  /** Primary destinations. Each inner array renders as a divider-separated cluster. */
  rail: RailItem[][]
  /** Utility destinations pinned to the bottom of the rail. */
  railUtilities: RailItem[]
  /** Second-level panels, keyed by `RailItem.section`. */
  sections: Record<string, NavSection>
}

/** Type guard: is this nav item an expandable parent? */
export function isCollapsible(item: NavItem): item is NavCollapsible {
  return "items" in item && Array.isArray(item.items)
}

/** Look up a section by key, falling back to the first configured section. */
export function getSection(key: string): NavSection {
  return sidebarConfig.sections[key] ?? Object.values(sidebarConfig.sections)[0]
}

/**
 * Drop entries the viewer lacks permission for, and remove groups left empty.
 * Pass-through when no `can` predicate is supplied.
 */
export function filterSection(
  section: NavSection,
  can: (permission: Permission) => boolean = () => true,
): NavSection {
  const allowed = (e: NavEntryBase) => !e.permission || can(e.permission)
  const groups = section.groups
    .map((group) => ({
      ...group,
      items: group.items
        .filter(allowed)
        .map((item) =>
          isCollapsible(item)
            ? { ...item, items: item.items.filter(allowed) }
            : item,
        ),
    }))
    .filter((group) => group.items.length > 0)
  return { ...section, groups }
}

/* -------------------------------------------------------------------------- */
/*                               Configuration                                */
/* -------------------------------------------------------------------------- */

export const sidebarConfig: SidebarConfig = {
  brand: { icon: Aperture, title: "BoraERP" },

  rail: [
    [{ title: "Início", icon: Home, section: "home" }],
    [{ title: "Cadastros", icon: Package, section: "cadastros" }],
    [
      { title: "Carteira", icon: CircleUser, section: "portfolio" },
      { title: "Mercado", icon: PieChart, section: "market" },
      { title: "Negociação", icon: TrendingUp, section: "trading" },
    ],
    [
      { title: "Ações", icon: ScatterChart, section: "stocks" },
      { title: "Scanner", icon: Scan, section: "scanner" },
      { title: "Análises", icon: BarChart3, section: "analytics" },
    ],
  ],

  railUtilities: [
    { title: "Configurações", icon: Settings, section: "settings" },
    { title: "Convidar", icon: Link2, section: "invite" },
    { title: "Suporte", icon: LifeBuoy, section: "support" },
  ],

  sections: {
    cadastros: {
      title: "Cadastros",
      description: "Gestão de entidades e produtos",
      groups: [
        {
          items: [{ title: "Produtos", icon: Package }],
        },
      ],
    },

    home: {
      title: "Início",
      description: "Seu ambiente de trabalho em um relance",
      groups: [
        {
          items: [
            {
              title: "Visão geral",
              icon: Gauge,
              items: [
                { title: "Resumo" },
                { title: "Desempenho" },
                { title: "Atividade recente" },
              ],
            },
            {
              title: "Atividade",
              icon: Activity,
              items: [
                { title: "Linha do tempo" },
                { title: "Menções" },
                { title: "Registro de auditoria" },
              ],
            },
            {
              title: "Notificações",
              icon: Bell,
              items: [
                { title: "Não lidas" },
                { title: "Todas" },
                { title: "Preferências" },
              ],
            },
          ],
        },
        {
          label: "Atalhos",
          items: [
            {
              title: "Lista de acompanhamento",
              icon: Star,
              items: [
                { title: "Padrão" },
                { title: "Seleção de tecnologia" },
                { title: "Dividendos" },
              ],
            },
            {
              title: "Visualizações salvas",
              icon: Bookmark,
              items: [{ title: "Minhas visualizações" }, { title: "Compartilhadas comigo" }],
            },
          ],
        },
        {
          label: "Links rápidos",
          items: [
            { title: "Calendário", icon: CalendarDays },
            { title: "Tarefas", icon: ListTodo },
            { title: "Caixa de entrada", icon: Inbox },
          ],
        },
      ],
    },

    portfolio: {
      title: "Carteira",
      description: "Posições, desempenho e contas",
      groups: [
        {
          items: [
            {
              title: "Posições",
              icon: Briefcase,
              items: [
                { title: "Por conta" },
                { title: "Por classe de ativo" },
                { title: "Por setor" },
              ],
            },
            {
              title: "Desempenho",
              icon: TrendingUp,
              items: [
                { title: "Retornos" },
                { title: "Referências" },
                { title: "Atribuição" },
              ],
            },
            {
              title: "Alocação",
              icon: PieChart,
              items: [
                { title: "Por classe de ativo" },
                { title: "Por setor" },
                { title: "Por região" },
              ],
            },
          ],
        },
        {
          label: "Contas",
          items: [
            {
              title: "Caixa e saldos",
              icon: Wallet,
              items: [
                { title: "Caixa disponível" },
                { title: "Pendente" },
                { title: "Margem" },
              ],
            },
            {
              title: "Transações",
              icon: CreditCard,
              items: [
                { title: "Depósitos" },
                { title: "Saques" },
                { title: "Negociações" },
              ],
            },
            {
              title: "Extratos",
              icon: History,
              items: [
                { title: "Mensal" },
                { title: "Anual" },
                { title: "Documentos fiscais" },
              ],
            },
          ],
        },
      ],
    },

    market: {
      title: "Mercado",
      description: "Cotações ao vivo, notícias e destaques",
      groups: [
        {
          items: [
            {
              title: "Visão geral",
              icon: Gauge,
              items: [
                { title: "Índices" },
                { title: "Moedas" },
                { title: "Commodities" },
              ],
            },
            {
              title: "Destaques",
              icon: TrendingUp,
              items: [
                { title: "Maiores altas" },
                { title: "Maiores baixas" },
                { title: "Mais negociadas" },
              ],
            },
            {
              title: "Setores",
              icon: PieChart,
              items: [
                { title: "Tecnologia" },
                { title: "Saúde" },
                { title: "Financeiro" },
                { title: "Energia" },
              ],
            },
          ],
        },
        {
          label: "Descobrir",
          items: [
            {
              title: "Notícias",
              icon: Newspaper,
              items: [
                { title: "Principais notícias" },
                { title: "Por ativo" },
                { title: "Resultados" },
              ],
            },
            {
              title: "Lista de acompanhamento",
              icon: Star,
              items: [{ title: "Padrão" }, { title: "Listas personalizadas" }],
            },
          ],
        },
      ],
    },

    trading: {
      title: "Negociação",
      description: "Ordens, posições e execução",
      groups: [
        {
          items: [
            {
              title: "Boleta de ordem",
              icon: Send,
              items: [
                { title: "Compra" },
                { title: "Venda" },
                { title: "Avançado" },
              ],
            },
            {
              title: "Posições abertas",
              icon: CandlestickChart,
              items: [
                { title: "Por ativo" },
                { title: "Por estratégia" },
                { title: "Encerradas hoje" },
              ],
            },
            {
              title: "Histórico de ordens",
              icon: History,
              items: [
                { title: "Executadas" },
                { title: "Em aberto" },
                { title: "Canceladas" },
              ],
            },
          ],
        },
        {
          label: "Estratégia",
          items: [
            {
              title: "Alvos",
              icon: Target,
              items: [{ title: "Preços-alvo" }, { title: "Stop loss" }],
            },
            {
              title: "Limites de risco",
              icon: Shield,
              items: [{ title: "Por posição" }, { title: "Por conta" }],
            },
          ],
        },
      ],
    },

    stocks: {
      title: "Ações",
      description: "Ativos filtrados e listas",
      groups: [
        {
          items: [
            {
              title: "Todas as ações",
              icon: CandlestickChart,
              items: [
                { title: "Por bolsa" },
                { title: "Por setor" },
                { title: "Por valor de mercado" },
              ],
            },
            {
              title: "Lista de acompanhamento",
              icon: Star,
              items: [{ title: "Padrão" }, { title: "Personalizada" }],
            },
            {
              title: "Filtros salvos",
              icon: Bookmark,
              items: [{ title: "Meus filtros" }, { title: "Modelos" }],
            },
          ],
        },
      ],
    },

    scanner: {
      title: "Scanner",
      description: "Crie e execute varreduras de mercado",
      groups: [
        {
          items: [
            { title: "Nova varredura", icon: Plus },
            {
              title: "Filtros",
              icon: Filter,
              items: [
                { title: "Preço e volume" },
                { title: "Fundamentos" },
                { title: "Indicadores técnicos" },
              ],
            },
            {
              title: "Varreduras recentes",
              icon: History,
              items: [
                { title: "Hoje" },
                { title: "Esta semana" },
                { title: "Salvas" },
              ],
            },
          ],
        },
      ],
    },

    analytics: {
      title: "Análises",
      description: "Relatórios, métricas e insights",
      groups: [
        {
          items: [
            {
              title: "Painéis",
              icon: Gauge,
              items: [
                { title: "Vendas" },
                { title: "Operações" },
                { title: "Financeiro" },
              ],
            },
            {
              title: "Desempenho",
              icon: TrendingUp,
              items: [
                { title: "Tendências" },
                { title: "Comparações" },
                { title: "Previsões" },
              ],
            },
            {
              title: "Detalhamento",
              icon: PieChart,
              items: [
                { title: "Por produto" },
                { title: "Por região" },
                { title: "Por canal" },
              ],
            },
          ],
        },
        {
          label: "Relatórios",
          items: [
            {
              title: "Relatórios salvos",
              icon: Bookmark,
              items: [{ title: "Meus relatórios" }, { title: "Compartilhados" }],
            },
            {
              title: "Agendados",
              icon: History,
              items: [
                { title: "Diário" },
                { title: "Semanal" },
                { title: "Mensal" },
              ],
            },
          ],
        },
      ],
    },

    settings: {
      title: "Configurações",
      description: "Preferências da conta e do ambiente",
      groups: [
        {
          items: [
            {
              title: "Perfil",
              icon: User,
              items: [
                { title: "Informações pessoais" },
                { title: "Preferências" },
                { title: "Sessões" },
              ],
            },
            {
              title: "Notificações",
              icon: Bell,
              items: [
                { title: "E-mail" },
                { title: "Push" },
                { title: "No aplicativo" },
              ],
            },
            {
              title: "Segurança",
              icon: Shield,
              items: [
                { title: "Senha" },
                { title: "Autenticação em dois fatores" },
                { title: "Chaves de API" },
              ],
            },
          ],
        },
        {
          label: "Ambiente",
          items: [
            {
              title: "Membros",
              icon: Users,
              items: [
                { title: "Ativos" },
                { title: "Convidados" },
                { title: "Funções" },
              ],
            },
            {
              title: "Cobrança",
              icon: CreditCard,
              items: [
                { title: "Plano" },
                { title: "Faturas" },
                { title: "Formas de pagamento" },
              ],
            },
          ],
        },
      ],
    },

    invite: {
      title: "Convidar",
      description: "Aumente sua equipe",
      groups: [
        {
          items: [
            {
              title: "Convidar pessoas",
              icon: Send,
              items: [
                { title: "Por e-mail" },
                { title: "Link de convite" },
                { title: "Importação em massa" },
              ],
            },
            {
              title: "Convites pendentes",
              icon: History,
              items: [{ title: "Enviados" }, { title: "Expirados" }],
            },
            {
              title: "Membros",
              icon: Users,
              items: [{ title: "Ativos" }, { title: "Funções" }],
            },
          ],
        },
      ],
    },

    support: {
      title: "Suporte",
      description: "Ajuda, documentação e contato",
      groups: [
        {
          items: [
            {
              title: "Central de ajuda",
              icon: Bookmark,
              items: [
                { title: "Primeiros passos" },
                { title: "Guias" },
                { title: "Perguntas frequentes" },
              ],
            },
            {
              title: "Fale conosco",
              icon: Send,
              items: [
                { title: "E-mail" },
                { title: "Chat ao vivo" },
                { title: "Telefone" },
              ],
            },
            {
              title: "Novidades",
              icon: Newspaper,
              items: [{ title: "Lançamentos" }, { title: "Planejamento" }],
            },
          ],
        },
      ],
    },
  },
}

/* -------------------------------------------------------------------------- */
/*                          Route derivation (URLs)                           */
/* -------------------------------------------------------------------------- */

/** Where `/dashboard` itself should land. */
export const DASHBOARD_ROOT = "/dashboard"

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function dashboardPath(...parts: string[]): string {
  return [DASHBOARD_ROOT, ...parts.map(slugify)].join("/")
}

/**
 * A concrete, navigable dashboard route. One per leaf entry across every
 * section. Drives `<Link>` targets, active-state detection, breadcrumbs, and
 * the route-page generator (`scripts/generate-dashboard-routes.ts`).
 */
export type DashboardRoute = {
  /** e.g. `/dashboard/portfolio/holdings/by-account` */
  url: string
  /** Section key, e.g. `portfolio`. */
  sectionKey: string
  /** Section display title, e.g. `Portfolio`. */
  sectionTitle: string
  /** Human-readable trail within the section, e.g. `["Holdings", "By account"]`. */
  trail: string[]
}

function buildRoutes(): DashboardRoute[] {
  const routes: DashboardRoute[] = []
  for (const [sectionKey, section] of Object.entries(sidebarConfig.sections)) {
    for (const group of section.groups) {
      for (const item of group.items) {
        if (isCollapsible(item)) {
          for (const child of item.items) {
            child.url = dashboardPath(sectionKey, item.title, child.title)
            routes.push({
              url: child.url,
              sectionKey,
              sectionTitle: section.title,
              trail: [item.title, child.title],
            })
          }
        } else {
          item.url = dashboardPath(sectionKey, item.title)
          routes.push({
            url: item.url,
            sectionKey,
            sectionTitle: section.title,
            trail: [item.title],
          })
        }
      }
    }
  }
  return routes
}

/** Every navigable dashboard route, in config order. URLs are filled by this pass. */
export const dashboardRoutes: DashboardRoute[] = buildRoutes()

const routesByUrl = new Map(dashboardRoutes.map((r) => [r.url, r]))

/** Look up route metadata for a pathname (exact match). */
export function findDashboardRoute(pathname: string): DashboardRoute | undefined {
  return routesByUrl.get(pathname)
}

/** The landing route for a rail destination — its first leaf. */
export function defaultRouteForSection(sectionKey: string): string {
  const section = sidebarConfig.sections[sectionKey]
  if (section) {
    for (const group of section.groups) {
      for (const item of group.items) {
        if (isCollapsible(item)) {
          if (item.items[0]?.url) return item.items[0].url
        } else if (item.url) {
          return item.url
        }
      }
    }
  }
  return `${DASHBOARD_ROOT}/${sectionKey}`
}

/** The default landing route for the dashboard as a whole. */
export function defaultDashboardRoute(): string {
  const first = sidebarConfig.rail[0]?.[0]?.section
  return first ? defaultRouteForSection(first) : DASHBOARD_ROOT
}

/** Is `pathname` inside the given rail destination? */
export function isSectionActive(pathname: string, sectionKey: string): boolean {
  const base = `${DASHBOARD_ROOT}/${sectionKey}`
  return pathname === base || pathname.startsWith(`${base}/`)
}

/** Resolve the active section key from the current pathname. */
export function sectionKeyFromPath(pathname: string): string {
  const segment = pathname.split("/")[2]
  return segment && sidebarConfig.sections[segment]
    ? segment
    : (sidebarConfig.rail[0]?.[0]?.section ??
        Object.keys(sidebarConfig.sections)[0])
}
