# products-table

<details>
  <summary>Table of Contents</summary>
    <ol>
      <li> <a href="#about-the-project">About The Project</a> </li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
      </li>
    </ol>
</details>

## About the project

The project consists in a table of all sorts of products to which an admin can add, edit or remove items. The table is also sortable/pageable. Additionally, whenever an item is selected its fields will be printed in order to display all of the object's information (more notable, the item id).

[showcase.webm](https://user-images.githubusercontent.com/79592589/194172068-023c50d0-09b6-484f-aceb-327e812b14bc.webm)


### Built With
* [Vue.js](https://vuejs.org/)
* [Nest.js](https://nestjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)

### Prerequisites

Node 16

### Installation
1. Clone the repo
  ```sh
  git clone https://github.com/nomoney34/products-table.git
  ```
2. Install npm in both api and frontend directories (will add later a postinstall script)
  ```sh
  cd frontend
  npm install
  cd ..
  cd api
  npm install
  cd ..
   ```
3. Run the app using docker composer (will create api/frontend images/containers).
```sh
docker-compose up
```

Should note that the DB itself is hosted on the official MongoDB cloud. Credentials of a db users with read/write permits is already typed inside the api. Obviously not safe but I doubt there is much to do with this info anyway lol.

    
