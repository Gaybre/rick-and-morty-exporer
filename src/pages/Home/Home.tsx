import { useEffect } from "react"
import { getCharacters } from "../../api/characters"

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const test = await getCharacters()
      console.log(test)
    }
    fetchData()
  }, [])
  return <div>Home</div>
}

export default Home
