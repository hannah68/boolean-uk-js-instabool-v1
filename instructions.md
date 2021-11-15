@here

Hey everyone!

**Make sure you read all the instructions**

**Today's exercise:** InstaBool

**Repo:** boolean-uk-js-instabool

**Description**
We're going to put to good use our knowledge of fetch by creating a full client in the browser! To achieve this, you'' have to set up all the interactions with the server

**Instructions**

- Use this template as a starting point. **Make sure you download it into your laptop** => https://codesandbox.io/s/instabool-template-cwhm7?file=/index.html
- Set up your json-server using the files in the db folder; **You must start the server on your local machine, using this exact command from the terminal on the root of your project folder: `json-server --watch db/db.json --routes db/routes.json`**
- Dynamically render the posts using the `card` HTML portion that you'll find in the index.html
- Try to use the same CSS classes to achieve the desired look
- Have the like button adding 1 like to the respective counter each time you click it
- Have the comments form to add another comment to the respective post
- **The data must be persisted in the server so that when you refresh the page it doesn't go away**

**Tips**

- Make some requests to your server and inspect the response, so you can check the data structure before start coding
- Focus first on render the data onto your page
- Try to think which kind of HTTP method you should use on each occasion
- Try to use function scopes to your advantage

**Challenge 1**
Uncomment the form from index.html. Setup the form so that you can add posts to the page. They must persist after a refresh. Make sure you append the cards **after** the form

**Challenge 2**
Add a delete button to each comment and post. Setup these buttons to be able to delete respectively comments and posts, and persist the changes.

**Challenge 3**
Add error handling to the app. The user should have a notification if something goes wrong
