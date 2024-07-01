interface ProjectProps {
  title: string,
  articles: { title: string, href: string, lang: string }[]
}

export default function Project({ title, articles }: ProjectProps) {
  return (
    <>
      <h3>Your project is:</h3>
      <h1 className="text-5xl font-bold">Code an <code className="bg-gray-900 p-2 rounded-md text-white">{title}</code></h1>
      <h3 className="mt-2 -mb-2">Some articles may help</h3>
      <ul>
        {articles.map(article => (
          <li><strong>{article.lang}</strong>: <a target="_blank" href={article.href}>{article.title}</a></li>
        ))}
      </ul>
    </>
  )
}
