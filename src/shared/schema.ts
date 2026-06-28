import { z } from "zod";

export const insertLeadSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido."),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;

export interface Lead {
  id: number;
  email: string;
  createdAt: Date;
}
