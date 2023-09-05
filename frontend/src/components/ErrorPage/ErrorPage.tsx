// import { useRouteError } from 'react-router-dom'
import { Container, Heading, VStack, Text } from '@chakra-ui/react'
import './ErrorPage.styles.tsx'

const ErrorPage = () => {
  // const error = useRouteError() as Error
  // console.error(error)

  return (
    <div id="error-page" className="page-wrapper">
      <Container>
        <VStack
          className="content"
          gap={4}
          textColor="white"
          textAlign="center"
        >
          <Heading>Uh oh, something went terribly wrong</Heading>
          <Text>Page Not Found!</Text>
          {/* <Text> */}
          {/*   <i>{error.message || JSON.stringify(error)}</i> */}
          {/* </Text> */}
        </VStack>
      </Container>
    </div>
  )
}

export default ErrorPage
