# My favorite repository
This app can be used to favorite some GitHub repositories that you like.
You will have two pages:
1. The first one contains the list of apps that you already favorited and a input, so you can add more of them.
2. With your list of favorite apps, you can click on them to get more information, the focus of this app is listing their issues, you are able to filter them by "open", "closed" or "all". The listed issues are links to the real issue, you can also click them to get more information.
Also: Favorited repositories will be added to localStorage, so you can refresh the page without losing them.

This is a simples web application made mainly with ReactJS and some libraries that are pretty cool, like:
- Axios - for easier http requests;
- react-router - for internal SPA routing;
- styled-components - for easier component styling and scoped CSS.
*It also includes the use of GitHub API.*

This app was made using the basic template generation with vite.
"yarn create vite --template react"

To run it locally you can do "yarn dev", and to see it on another dispositives you can do "yarn dev --host", you may need to create a new rule on the windows firewall (if you are using windows) so the external request (maybe from your phone) can be done.

Some reliable links:
- GitHub API             - https://docs.github.com/en/rest?apiVersion=2022-11-28
- React docs             - https://react.dev/
- Vite docs              - https://vite.dev/
- React-Router docs      - https://reactrouter.com/start/declarative/routing
- Styled-components docs - https://styled-components.com/docs
- Axios docs             - https://axios-http.com/docs/intro
