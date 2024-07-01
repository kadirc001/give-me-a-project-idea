import { useEffect, useState } from 'react'
import markdown from 'markdown'
import Project from './components/Project'

interface Idea {
  title: string,
  articles: { href: string, title: string}[]
}

export default function App() {
  const [idea, setIdea] = useState<Idea>({ title: "Loading", articles: []})

  useEffect(() => {
    async function fetchIdea() {
      const response = await fetch("https://raw.githubusercontent.com/codecrafters-io/build-your-own-x/master/README.md")
      const output = await response.text()
      const json = markdown.markdown.parse(output).slice(8, 60)
      const index = Math.floor(Math.random() * (json.length / 2)) * 2
      const header = json[index][3][1]
      const articles = json[index + 1].slice(1)
      const articlesCopy = []
      articles.forEach(item => {
        const lang = item[1][2][1]
        articlesCopy.push({ href: item[1][1].href, title: item[1][4][1], lang })
      })
      console.log(header, articlesCopy)
      setIdea({
        title: header,
        articles: articlesCopy
      })
    }
    fetchIdea()
  })

  return (
    <>
      <h1 className="text-3xl font-bold mt-10">Give Me a Project Idea</h1>
      <p>Give me a project idea is a platform sourcing resources directly from the <a href="https://github.com/codecrafters-io/build-your-own-x">build-your-own-x</a> repositories on GitHub. </p>
      <p>If you like this project, give us a star on <a href="https://github.com/kadirc001/give-me-a-project-idea">Github</a>.</p>
      <Project title={idea.title} articles={idea.articles} />
    </>
  )
}
