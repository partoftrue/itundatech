export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image: string | null
          published: boolean
          read_time: number | null
          author_id: string
          category_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          cover_image?: string | null
          published?: boolean
          read_time?: number | null
          author_id: string
          category_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          cover_image?: string | null
          published?: boolean
          read_time?: number | null
          author_id?: string
          category_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
      }
      comments: {
        Row: {
          id: string
          content: string
          article_id: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          article_id: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          article_id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
