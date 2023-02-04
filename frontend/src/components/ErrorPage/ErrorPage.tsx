import { useRouteError } from 'react-router-dom'
import { Container, Heading, HStack, Text } from '@chakra-ui/react'
import './ErrorPage.styles.tsx'

const ErrorPage = () => {
  const error = useRouteError() as Error
  console.error(error)

  return (
    <div id="error-page" className="body-wrapper">
      <Container>
        <HStack className="content" gap={4}>
          <Heading>Uh oh, something went terribly wrong</Heading>
          <Text>Page Not Found!</Text>
          <Text>
            <i>{error.message || JSON.stringify(error)}</i>
          </Text>
        </HStack>
      </Container>
    </div>
  )
}

export default ErrorPage
