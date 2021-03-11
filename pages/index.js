import Layout from "../components/Layout";
import Link from "next/link"
import Header from "../components/Header";

export default function Home() {

  
  return (
      <Layout home>
        
      <main>
        <h1> Burger burger</h1>
        <nav>
          <ul>
            <li>
              <Link href="/restaurant">
                <a>Resturant</a>
              </Link>
            </li>
            <li>
              <Link href="/kitchen">
                <a>Kjøkken</a>
              </Link>
            </li>
            <li>
              <Link href="/user">
                <a>Bruker</a>
              </Link>
            </li>
          </ul>
        </nav>
      </main>

      </Layout>
    
  )
}
