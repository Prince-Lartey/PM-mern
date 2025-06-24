import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth-context";
import { Toaster } from "sonner";

export const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
                <Toaster position="top-center" richColors />
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;