import { Calendar } from "../Calendar";

import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@/test-utils";

test("Reserve appointment", async () => {
  render(<Calendar />);

  const appointments = await screen.findAllByRole("button", {
    name: /\d\d? [ap]m\s+(scrub|facial|massage)/i,
  });

  fireEvent.click(appointments[0]);

  const alertToast = await screen.findByRole("status");
  expect(alertToast).toHaveTextContent("reserve");

  const alertCloseButton = screen.getByRole("button", { name: "Close" });
  fireEvent.click(alertCloseButton);
  await waitForElementToBeRemoved(alertToast);
});
