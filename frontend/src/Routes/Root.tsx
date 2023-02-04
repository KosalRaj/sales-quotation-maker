import { Button } from "@chakra-ui/react";
import './Root.styles.scss'

export default function Root() {
  return (
    <>
      <div id="navigation">
        <nav>
          <ul>
            <li>
              <Button size="lg" colorScheme='blue'>
                <a href={`/quotation/create`}>Create Quotation</a>
              </Button>
            </li>
            <li>
              <Button size="lg">
                <a href={`/quotations`}>All Quotation</a>
              </Button>
            </li>
            <li>
              <Button size="lg">
                <a href={`/items`}>Items</a>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  )
}
