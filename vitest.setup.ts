import "@testing-library/jest-dom/vitest";

class MockEventSource {
  onmessage: ((event: MessageEvent) => void) | null = null;

  close() {}
}

// @ts-expect-error test shim
global.EventSource = MockEventSource;
