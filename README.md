
# DevFinder - A developer-centric social media

DevFinder is a social platform built for developers. It enables developers to connect, share and learn from each other. Our main motto is to help developers collaborate easily and work in teams efficiently.


## Run Locally
In order to run this project locally you need to run the backend and the frontend simultaneously.

For running the backend:

Clone the project

```bash
  git clone https://github.com/atharvabhide/DevFinder.git
```

Go to the project directory

```bash
  cd DevFinder
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  python manage.py runserver
```
Now in a separate terminal, switch the branch to dev/frontend

```bash
  git checkout dev/frontend
```
Then, 

```bash
  npm i --force
```
And finally run the frontend server with 
```bash
  npm run dev
```
DevFinder's frontend should be up and running on port 5173

## Tech Stack

**Client:** 
<ul>
<li>React </li>
<li>Modular CSS</li>
<li>Axios</li>
<li>Netlify</li>
</ul>

**Server:** 
<ul>
<li>Django Rest Framework </li>
<li>alt-profanity-check</li>
<li>opennsfw2 </li>
<li>Tensorflow </li>
<li>Custom recommendation engine</li>
<li>AWS EC2</li>
<li>Nginx</li>
<li>Gunicorn</li>
<ul>
  
  ## Postman Documentation: <a href="https://documenter.getpostman.com/view/19369668/2s93eYTrtf" target="_blank">Link</a>
  
## Backend Architecture
  ![](https://github.com/atharvabhide/DevFinder/blob/dev/backend/architecture.jpg)

## Demo
  ![](https://github.com/atharvabhide/DevFinder/blob/dev/backend/cover%20image.png)
  
  ![](https://github.com/atharvabhide/DevFinder/blob/dev/backend/gif.gif)


## Authors

- [@dhananjay-deshmukh](https://www.github.com/dhananjay-deshmukh)
- [@atharvabhide](https://www.github.com/atharvabhide)
- [@Aakash](https://www.github.com/aakvshh)



