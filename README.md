# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- - -
# Project Name
### Skill Based Assessment #8 --- <em> React Web Application </em>

- - -

## $\color{green}{Project \: Description}$
### Find an API that tickles your fancy either from the given list of API's or whichever one you find interesting. Build a web application using React.jsx alongside some CSS stylesheets in sprucing up the page. Use AJAX (Asychronous JavaScript and XML) to make a request to an external data source (API) and insert some of the data back into the browser DOM. The minimum viable product (MVP) are listed as such:

* To implement at least the useState() React hook to save form data and the useEffect() hook to make API call back to the database.

- - - 

## $\color{lightblue}{Technologies \: Used}$

### React (vite)
#### Built-in React boilerplate, React fragments `<>` (parent container in return block)

### React hooks
#### useState(), useEffect()

### Axios
#### axio.get() to fetch data from database

### AJAX
#### "Async" function required to make "await" fetch data (Promise)
#### Heading `<h1>`... tags, `<div>` containers, `<footer>`, `<button>`, `<a>`, etc.

### Error-handling 
```
    try(){ 
    ... 
    }
    catch(err){
        console.error(err);
    }
```

### Conditional Rendering
#### Ternary operator `? :` to toggle between invoking loaded() or loading() function
#### If statements -- filter between which API URL path to fetch data from depending on input form
#### Logical AND operator `&&` -- check if retrieved data exists

### React functional component
#### root App() ...

### React Bootstrap Framework -- for styling (partially functioning ...)
#### `<Navbar>`, `<Container>`, `<Button>`, `<Spinner>`
 
### React-Router-Dom
#### <Link> component (navigate to another functional component) was going to use it to re-direct to an external page (like a basic `<a>` so decided not to)

### Git Bash: Linux commands on CLI

### Git version control

* Others: Github add, commits; JS package, VSCode IDE,  NPM JavaScript package manager, vite, 

- - - 

## $\color{lightgreen}{How \: To \: Get \: Started}$

### Install vite
> `npm create vite@latest .`
>> * `React`
>> * `JavaScript`
>> * `npm install` 

### Run the asychronous app
> `npm run dev`

### *Opens up application on default browser*
> `ctrl + 'http://localhost:5173'` 

### Go back to VS Code IDE
> * Go to `src` directory then to `App.jsx` 
> * Delete boilerplate in `return` block

### Begin

> **"Work Top-Down ... focus on hitting the MVP (functionality over form normally ...)". This time there's some emphasis on styling -- perhaps practice to Capstone?**

- - - 

## $\color{orange}{Acknowledgements}$

### Reference to previous recent labs in lecture 320, warmups and practices from class

### 3rd Party REST Countries API
 * https://restcountries.com/#endpoints-name
 * https://restcountries.com/v3.1/all

### Lecture Notes
 * https://ps-react-curriculum.herokuapp.com/320/7/lesson/

### Styling
 * https://coolors.co/palettes/popular
 * https://fonts.google.com/
 * https://freefrontend.com/css-glow-text-effects/
 * https://baseline.is/tools/css-gradients/

### .SVG Images (Why not .PNG? .SVG apparently is higher quality here >.> they say)
 * https://www.svgrepo.com/svg/232027/duck-animal
 * https://www.svgrepo.com/vectors/duck/

``` *All used source materals are stored in the "reference" folder of this repo.* ```