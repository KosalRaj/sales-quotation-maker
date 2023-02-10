import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: {
      main: "hsl(227, 66%, 64%)",
      light: "hsl(227, 66%, 95%)",
      lighter: "hsl(227, 57%, 97%)",
    },
    brand: {
      gray: "hsl(0, 0%, 25%)",
      lightest: "hsla(0, 0%, 0%, 0.06)",
      mainbg: "hsl(227, 54%, 97%)",
      hoverMenuBG: "hsl(0, 0%, 94%)"
    }
  }
})
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
