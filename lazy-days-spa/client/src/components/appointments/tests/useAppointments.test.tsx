import { act, renderHook, waitFor } from "@testing-library/react";

import { useAppointments } from "../hooks/useAppointments";
import type { AppointmentDateMap } from "../types";

import { createQueryClientWrapper } from "@/test-utils";

const getAppointmentCount = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0
  );

test("filter appointments by availability", async () => {
  const { result } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper(),
  });

  await waitFor(() =>
    expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(0)
  );

  const filteredAppointmentsLength = getAppointmentCount(
    result.current.appointments
  );

  act(() => {
    result.current.setShowAll(true);
  });

  await waitFor(() =>
    expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(
      filteredAppointmentsLength
    )
  );
});
