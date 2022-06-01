/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

// Route.get("/", async () => {
//   return { hello: "world" };
// });
// Route.group(() => {
//   Route.post("/upload", "UploadsController.upload");
//   Route.post("/upload/single", "UploadsController.single");
//   Route.post("/upload/multiple", "UploadsController.multiple");
//   Route.get("/upload", "UploadsController.index");
// }).prefix("/api");

Route.group(() => {
  Route.get('folders', 'FoldermanagersController.index');
  Route.post('folders', 'FoldermanagersController.store');
  Route.get('files', 'FilemanagersController.index');
  Route.post('files', 'FilemanagersController.store');
  Route.delete('files/*', 'FilemanagersController.destroy');
  Route.delete('folders/*', 'FoldermanagersController.destroy');
}).prefix("/api");


Route.get("/uploadz", "UploadsController.index");
Route.get("/uploadzz", "UploadsController.upload");

Route.post('/conform', 'ConformsController.store');

Route.post('/direct-upload', 'DirectUploadsController.store');
