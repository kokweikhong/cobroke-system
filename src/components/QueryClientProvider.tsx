"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider as QCP,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const QueryClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <QCP client={queryClient}>{children}</QCP>;
};

export default QueryClientProvider;
