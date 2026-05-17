import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DashboardClient } from "@/components/dashboard-client";
import { createEmptyDashboard, createInitialChatMessage } from "@/lib/demo-data/seed";

// Firebase cannot initialize in the test environment (no API key).
// Mock the config module so no Firebase SDK calls are made during tests.
vi.mock("@/lib/firebase/config", () => ({
  auth: {},
  db: {},
  app: {},
}));

// Mock auth context so DashboardClient renders without a real Firebase session.
vi.mock("@/components/auth-context", () => ({
  useAuth: () => ({
    user: { uid: "test-uid", email: "test@test.com" },
    isAdmin: true,
    loading: false,
    isDevBypass: false,
    login: vi.fn(),
    logout: vi.fn(),
    devBypass: vi.fn(),
    devBypassClient: vi.fn(),
    error: null,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin",
  useRouter: () => ({
    replace: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
  }),
}));

describe("dashboard client", () => {
  it("renders command view summary", () => {
    const initialData = createEmptyDashboard(
      [
        {
          id: "AG-HERMES",
          name: "Hermes",
          role: "Primary Interface / Orchestrator",
          status: "ACTIVE",
          currentTaskCount: 0,
          latestEventSummary: "Hermes runtime installed."
        }
      ],
      [
        {
          id: "brief-1",
          source: "SYSTEM",
          note: "Hermes runtime installed.",
          createdAt: new Date().toISOString()
        }
      ],
      createInitialChatMessage("Hermes runtime installed.")
    );
    render(<DashboardClient initialData={initialData} section="command" />);
    expect(screen.getByText(/Monthly Survival Target/i)).toBeInTheDocument();
    expect(screen.getByText(/Needs Your Attention/i)).toBeInTheDocument();
  });

  it("renders toolkit content", () => {
    const initialData = createEmptyDashboard(
      [
        {
          id: "AG-HERMES",
          name: "Hermes",
          role: "Primary Interface / Orchestrator",
          status: "ACTIVE",
          currentTaskCount: 0,
          latestEventSummary: "Hermes runtime installed."
        }
      ],
      [
        {
          id: "brief-1",
          source: "SYSTEM",
          note: "Hermes runtime installed.",
          createdAt: new Date().toISOString()
        }
      ],
      createInitialChatMessage("Hermes runtime installed.")
    );
    render(<DashboardClient initialData={initialData} section="research" />);
    expect(screen.getAllByText("Research").length).toBeGreaterThan(0);
    expect(screen.getByText(/LAYER 1/i)).toBeInTheDocument();
  });
});
