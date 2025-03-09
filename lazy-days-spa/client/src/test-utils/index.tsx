import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as RtlRender } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

// ** FOR TESTING CUSTOM HOOKS ** //
// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
// export const createQueryClientWrapper = () => {
//   const queryClient = generateQueryClient();
//   return ({ children }: PropsWithChildren) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

const generateQueryClient = () => {
  return new QueryClient();
};

// reference: https://testing-library.com/docs/react-testing-library/setup#custom-render
function customRender(ui: ReactElement, client?: QueryClient) {
  const queryClient = client ?? generateQueryClient();

  return RtlRender(
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{ui}</MemoryRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

// override render method
export { customRender as render };
