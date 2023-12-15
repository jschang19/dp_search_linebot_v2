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
      cac_majors: {
        Row: {
          aboriginal: string
          expected_candidate: number
          fee: number
          full_name: string
          gender_requirement: string
          has_exam: string
          key: string
          outlying: string
          recruit: number
          review_date: string
          support_measure: string
          type: string
          university_code: string
          url: string
          view_count: number
          vision: string
        }
        Insert: {
          aboriginal: string
          expected_candidate: number
          fee: number
          full_name: string
          gender_requirement: string
          has_exam: string
          key: string
          outlying: string
          recruit: number
          review_date: string
          support_measure: string
          type: string
          university_code: string
          url: string
          view_count?: number
          vision: string
        }
        Update: {
          aboriginal?: string
          expected_candidate?: number
          fee?: number
          full_name?: string
          gender_requirement?: string
          has_exam?: string
          key?: string
          outlying?: string
          recruit?: number
          review_date?: string
          support_measure?: string
          type?: string
          university_code?: string
          url?: string
          view_count?: number
          vision?: string
        }
        Relationships: [
          {
            foreignKeyName: "cac_majors_university_code_fkey"
            columns: ["university_code"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["code"]
          }
        ]
      }
      chat_conversations: {
        Row: {
          content: string | null
          created_at: string
          id: number
          role: string | null
          session_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          role?: string | null
          session_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          role?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          }
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          is_deleted: boolean
          major_key: string | null
          messages: Json[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          is_deleted?: boolean
          major_key?: string | null
          messages?: Json[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_deleted?: boolean
          major_key?: string | null
          messages?: Json[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      customer_records: {
        Row: {
          created_at: string
          id: number
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          type?: string | null
        }
        Relationships: []
      }
      line_search_log: {
        Row: {
          created_at: string
          id: number
          keyword: string
          line_id: string
          major_ids: string[] | null
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          keyword: string
          line_id: string
          major_ids?: string[] | null
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          keyword?: string
          line_id?: string
          major_ids?: string[] | null
          type?: string
        }
        Relationships: []
      }
      line_user_preferences: {
        Row: {
          created_at: string
          line_id: string
          mode: Database["public"]["Enums"]["line_search_mode"] | null
        }
        Insert: {
          created_at?: string
          line_id: string
          mode?: Database["public"]["Enums"]["line_search_mode"] | null
        }
        Update: {
          created_at?: string
          line_id?: string
          mode?: Database["public"]["Enums"]["line_search_mode"] | null
        }
        Relationships: []
      }
      line_user_savelists: {
        Row: {
          created_at: string
          line_id: string
          major_key: string
          type: Database["public"]["Enums"]["line_search_mode"] | null
          university_code: string
        }
        Insert: {
          created_at?: string
          line_id: string
          major_key: string
          type?: Database["public"]["Enums"]["line_search_mode"] | null
          university_code: string
        }
        Update: {
          created_at?: string
          line_id?: string
          major_key?: string
          type?: Database["public"]["Enums"]["line_search_mode"] | null
          university_code?: string
        }
        Relationships: []
      }
      majors: {
        Row: {
          full_name: string | null
          key: string
          university_code: string
        }
        Insert: {
          full_name?: string | null
          key: string
          university_code: string
        }
        Update: {
          full_name?: string | null
          key?: string
          university_code?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          identity: number | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id: string
          identity?: number | null
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          identity?: number | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      result_test: {
        Row: {
          contury: string | null
          created_at: string
          id: number
          is_broadcasted: boolean
          school: string | null
          title: string | null
        }
        Insert: {
          contury?: string | null
          created_at?: string
          id?: number
          is_broadcasted?: boolean
          school?: string | null
          title?: string | null
        }
        Update: {
          contury?: string | null
          created_at?: string
          id?: number
          is_broadcasted?: boolean
          school?: string | null
          title?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          id: number
          is_deleted: boolean
          is_recommended: boolean
          is_reviewed: boolean
          major: Json | null
          method: string | null
          process: string | null
          questions: Json | null
          suggestion: string | null
          survey_id: string
          university: Json | null
          user_id: string | null
          user_nickname: string | null
          year: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_deleted?: boolean
          is_recommended?: boolean
          is_reviewed?: boolean
          major?: Json | null
          method?: string | null
          process?: string | null
          questions?: Json | null
          suggestion?: string | null
          survey_id: string
          university?: Json | null
          user_id?: string | null
          user_nickname?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_deleted?: boolean
          is_recommended?: boolean
          is_reviewed?: boolean
          major?: Json | null
          method?: string | null
          process?: string | null
          questions?: Json | null
          suggestion?: string | null
          survey_id?: string
          university?: Json | null
          user_id?: string | null
          user_nickname?: string | null
          year?: string | null
        }
        Relationships: []
      }
      star_majors: {
        Row: {
          additional_quota_allowed: string
          additional_recruit: string
          full_name: string
          group: string
          key: string
          quota_allowed: string
          recruit: string
          university_code: string
          url: string
          view_count: number
        }
        Insert: {
          additional_quota_allowed: string
          additional_recruit: string
          full_name: string
          group: string
          key: string
          quota_allowed: string
          recruit: string
          university_code: string
          url: string
          view_count?: number
        }
        Update: {
          additional_quota_allowed?: string
          additional_recruit?: string
          full_name?: string
          group?: string
          key?: string
          quota_allowed?: string
          recruit?: string
          university_code?: string
          url?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "star_majors_university_code_fkey"
            columns: ["university_code"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["code"]
          }
        ]
      }
      star_rules: {
        Row: {
          rank: string
          remark: string
          transfer_rule: string
          university_code: string
        }
        Insert: {
          rank: string
          remark: string
          transfer_rule: string
          university_code: string
        }
        Update: {
          rank?: string
          remark?: string
          transfer_rule?: string
          university_code?: string
        }
        Relationships: []
      }
      uac_majors: {
        Row: {
          ceec_test: string
          english_listening: string
          full_name: string
          key: string
          last_year: string
          order1: string
          order2: string
          order3: string
          order4: string
          order5: string
          redirect_url: string
          university_code: string
          view_count: number
        }
        Insert: {
          ceec_test: string
          english_listening: string
          full_name: string
          key: string
          last_year: string
          order1: string
          order2: string
          order3: string
          order4: string
          order5: string
          redirect_url: string
          university_code: string
          view_count?: number
        }
        Update: {
          ceec_test?: string
          english_listening?: string
          full_name?: string
          key?: string
          last_year?: string
          order1?: string
          order2?: string
          order3?: string
          order4?: string
          order5?: string
          redirect_url?: string
          university_code?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "uac_majors_university_code_fkey"
            columns: ["university_code"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["code"]
          }
        ]
      }
      universities: {
        Row: {
          code: string
          full_name: string | null
          key: string
          search_words: string
        }
        Insert: {
          code: string
          full_name?: string | null
          key: string
          search_words: string
        }
        Update: {
          code?: string
          full_name?: string | null
          key?: string
          search_words?: string
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          created_at: string
          id: number
          major_key: string
          question: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          major_key: string
          question?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          major_key?: string
          question?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_survey: {
        Args: {
          survey_id: string
        }
        Returns: undefined
      }
      get_major_key_by_name: {
        Args: {
          university: string
          name: string
        }
        Returns: string
      }
      get_majors_by_university: {
        Args: {
          university: string
        }
        Returns: {
          full_name: string
          key: string
        }[]
      }
      get_user_identity: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      get_user_profile: {
        Args: {
          user_id: string
        }
        Returns: {
          name: string
          email: string
          idenity: number
        }[]
      }
      get_user_survey_counts: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      get_user_surveys: {
        Args: {
          user_id: string
        }
        Returns: {
          survey_id: string
          university: Json
          major: Json
          year: string
          method: string
          is_reviewed: boolean
          created_at: string
        }[]
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: unknown
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: unknown
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
    }
    Enums: {
      line_search_mode: "cac" | "uac" | "star"
    }
    CompositeTypes: {
      http_header: {
        field: string
        value: string
      }
      http_request: {
        method: unknown
        uri: string
        headers: unknown
        content_type: string
        content: string
      }
      http_response: {
        status: number
        content_type: string
        headers: unknown
        content: string
      }
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
