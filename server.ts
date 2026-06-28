import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { z } from "zod";

interface Lead {
  id: number;
  email: string;
  createdAt: string;
}

// In-memory list for holding submitted leads
const leadsStore: Lead[] = [];
let currentLeadId = 1;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming request JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // API logs middleware
  app.use((req, _res, next) => {
    if (req.path.startsWith("/api")) {
      console.log(`[API REQUEST] ${req.method} ${req.path} - ${new Date().toISOString()}`);
    }
    next();
  });

  // --- API ROUTES FIRST ---

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", count: leadsStore.length });
  });

  // Post new email lead
  app.post("/api/leads", (req, res) => {
    try {
      const emailSchema = z.object({
        email: z.string().email("Por favor, insira um e-mail válido."),
      });

      const parsed = emailSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: parsed.error.issues[0].message,
          field: "email",
        });
      }

      const { email } = parsed.data;

      // Check if lead already exists (optional but nice)
      const existing = leadsStore.find((l) => l.email === email);
      if (existing) {
        return res.status(201).json(existing);
      }

      const newLead: Lead = {
        id: currentLeadId++,
        email,
        createdAt: new Date().toISOString(),
      };

      leadsStore.push(newLead);
      console.log(`[SUCCESS] Lead registered: id=${newLead.id}, email=${newLead.email}`);
      
      return res.status(201).json(newLead);
    } catch (err: any) {
      console.error("Error creating lead:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all leads (useful for admin/debugging, keep secure but visible for this sandbox)
  app.get("/api/leads", (_req, res) => {
    res.json(leadsStore);
  });

  // --- VITE MIDDLEWARE SETUP ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Running at http://localhost:${PORT}`);
  });
}

startServer();
