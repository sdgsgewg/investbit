// import { type InferOutput } from "valibot"; // Optional for validation, or use plain types

// Supabase Database type definitions
// Generate/update via: npx supabase gen types typescript --local > this file

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rd_categories: {
        Row: {
          id: string;
          name: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "rd_items_category_id_fkey";
            columns: [rd_items.category_id];
            isOneToMany: true;
            referencedRelation: "rd_items";
          },
        ];
      };
      rd_items: {
        Row: {
          id: string;
          name: string;
          category_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          category_id?: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category_id?: string;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "rd_items_category_id_fkey";
            columns: [rd_items.category_id];
            isOneToMany: false;
            referencedRelation: "rd_categories";
          },
          {
            foreignKeyName: "rd_records_item_id_fkey";
            columns: [rd_records.item_id];
            isOneToMany: true;
            referencedRelation: "rd_records";
          },
        ];
      };
      rd_records: {
        Row: {
          id: string;
          item_id: string;
          date: string; // DATE
          yield_1d: number | null;
          yield_ytd: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          item_id: string;
          date: string;
          yield_1d?: number | null;
          yield_ytd?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          item_id?: string;
          date?: string;
          yield_1d?: number | null;
          yield_ytd?: number | null;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "rd_records_item_id_fkey";
            columns: [rd_records.item_id];
            isOneToMany: false;
            referencedRelation: "rd_items";
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Usage examples:
// import { Database } from '@/types/supabase'
// type Record = Database['public']['Tables']['rd_records']['Row']
// supabase.from('rd_records').select().returns<Record[]>()
