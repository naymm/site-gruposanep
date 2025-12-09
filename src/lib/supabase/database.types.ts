/**
 * Tipos gerados automaticamente pelo Supabase
 * Execute: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/database.types.ts
 * 
 * Por enquanto, tipos básicos baseados no schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categorias: {
        Row: {
          id: string
          nome: string
          slug: string
          descricao: string | null
          cor: string | null
          icone: string | null
          ativo: boolean
          ordem: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          slug: string
          descricao?: string | null
          cor?: string | null
          icone?: string | null
          ativo?: boolean
          ordem?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          slug?: string
          descricao?: string | null
          cor?: string | null
          icone?: string | null
          ativo?: boolean
          ordem?: number
          created_at?: string
          updated_at?: string
        }
      }
      autores: {
        Row: {
          id: string
          nome: string
          email: string | null
          foto: string | null
          cargo: string | null
          bio: string | null
          ativo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          email?: string | null
          foto?: string | null
          cargo?: string | null
          bio?: string | null
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          email?: string | null
          foto?: string | null
          cargo?: string | null
          bio?: string | null
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      noticias: {
        Row: {
          id: string
          titulo: string
          slug: string
          resumo: string
          conteudo: string
          imagem_principal: string
          destaque: boolean
          publicada: boolean
          data_publicacao: string
          visualizacoes: number
          categoria_id: string
          autor_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          slug: string
          resumo: string
          conteudo: string
          imagem_principal: string
          destaque?: boolean
          publicada?: boolean
          data_publicacao?: string
          visualizacoes?: number
          categoria_id: string
          autor_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          slug?: string
          resumo?: string
          conteudo?: string
          imagem_principal?: string
          destaque?: boolean
          publicada?: boolean
          data_publicacao?: string
          visualizacoes?: number
          categoria_id?: string
          autor_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

