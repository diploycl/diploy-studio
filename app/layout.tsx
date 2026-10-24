import './globals.css';
import { ThemeProvider } from 'next-themes';
export const metadata={title:'Diploy / Studio',description:'El espacio de trabajo de Maca y Paolo.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="es" suppressHydrationWarning><body><ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider></body></html>}
