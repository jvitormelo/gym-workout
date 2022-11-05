import { act, fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Timer } from ".";

class MockNotification {
  static permission = "granted";
  constructor(title: string, options: NotificationOptions) {
    return {
      title,
      options,
    };
  }
}

const setup = () => {
  return render(<Timer />);
};

describe("timer component", () => {
  it("should render", () => {
    const { container } = setup();

    expect(container).toBeTruthy();
  });

  it("should render start button", () => {
    const { getByTestId } = setup();

    const startButton = getByTestId("start-button");

    expect(startButton).toBeTruthy();
  });

  it("should starts with Start text", () => {
    const { getByText } = setup();

    const startButton = getByText("Start", {
      selector: "button[data-testid='start-button'] span",
    });

    expect(startButton).toBeTruthy();
  });

  it("should hide start text when clicked", () => {
    const { getByTestId, queryByText } = setup();

    const startButton = getByTestId("start-button");

    fireEvent.click(startButton);

    const startText = queryByText("Start", {
      selector: "button[data-testid='start-button'] span",
    });

    expect(startText).toBeFalsy();
  });

  it.each([
    {
      seconds: 30,
    },
    {
      seconds: 60,
    },
    {
      seconds: 90,
    },
  ])("after %s seconds should show Start text", ({ seconds }) => {
    vi.stubGlobal("navigator", {
      vibrate: () => {
        return;
      },
    });

    window.focus = () => {
      return;
    };

    vi.stubGlobal("Notification", MockNotification);

    vi.useFakeTimers();

    const { getByTestId, getByText } = setup();

    const startButton = getByTestId("start-button");

    fireEvent.click(startButton);

    act(() => {
      vi.advanceTimersByTime(seconds * 1000);
    });

    const startText = getByText("Start", {
      selector: "button[data-testid='start-button'] span",
    });

    expect(startText).toBeTruthy();
  });

  it.each([
    {
      seconds: 30,
      expected: 30,
    },
    {
      seconds: 60,
      expected: 60,
    },
    {
      seconds: 90,
      expected: 90,
    },
  ])("should show %s seconds", ({ seconds, expected }) => {
    const { getByTestId, getByText } = setup();

    const startButton = getByTestId("start-button");

    const input = getByTestId("timer-input");

    fireEvent.change(input, { target: { value: seconds } });

    fireEvent.click(startButton);

    const startText = getByText(expected.toString(), {
      selector: "button[data-testid='start-button'] span",
    });

    expect(startText).toBeTruthy();
  });
});
