export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          company: string
          created_at: string | null
          email: string | null
          id: string
          industry: string | null
          last_contact: string | null
          location: string | null
          name: string
          notes: string | null
          phone: string | null
          position: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          last_contact?: string | null
          location?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          last_contact?: string | null
          location?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          duration: string | null
          id: string
          order_id: string | null
          payment_id: string
          program_title: string
          signature: string | null
          status: string | null
          user_email: string
          user_name: string
          user_phone: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          duration?: string | null
          id?: string
          order_id?: string | null
          payment_id: string
          program_title: string
          signature?: string | null
          status?: string | null
          user_email: string
          user_name: string
          user_phone: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          duration?: string | null
          id?: string
          order_id?: string | null
          payment_id?: string
          program_title?: string
          signature?: string | null
          status?: string | null
          user_email?: string
          user_name?: string
          user_phone?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          referral_code: string
          referred_email: string
          referrer_email: string
          reward_amount: number
          reward_type: string
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referral_code: string
          referred_email: string
          referrer_email: string
          reward_amount: number
          reward_type: string
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referral_code?: string
          referred_email?: string
          referrer_email?: string
          reward_amount?: number
          reward_type?: string
          status?: string | null
        }
        Relationships: []
      }
      seo_keywords: {
        Row: {
          category: string
          created_at: string
          id: string
          keyword: string
          last_used_at: string | null
          relevance_score: number
          usage_count: number | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          keyword: string
          last_used_at?: string | null
          relevance_score?: number
          usage_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          keyword?: string
          last_used_at?: string | null
          relevance_score?: number
          usage_count?: number | null
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          created_at: string
          id: string
          name: string
          program: string
          quote: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          program: string
          quote: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          program?: string
          quote?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_unique_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
