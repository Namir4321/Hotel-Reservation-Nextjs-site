import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";
const Providers = ({ children }) => {
  return (
    <>
    <Toaster/>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
