const fs = require('fs')
const path = require('path')
const POSTS_PATH = path.join(process.cwd(), 'content/posts')

fs.readdirSync(POSTS_PATH)
  // Only use JSON, to ignore legacy md files
  .filter((path) => path.includes('.md'))
  // Load data from file paths
  .forEach((path) => {
    console.log(path)
    const markdown = require(`./content/posts/${path}`)
    // const { attributes } = markdown
    console.log(markdown)
    fs.writeFile(
      `/content/posts/${path.replace('.md', '.json')}`,
      attributes,
      (err) => {
        if (err) {
          console.error(err)
        }
        // file written successfully
      }
    )
  })
