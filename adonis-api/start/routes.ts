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

import Route from '@ioc:Adonis/Core/Route'

Route.post('/authenticate', 'UsersController.authenticate')

Route.group(() => {

  Route.post('/users', 'UsersController.create')
  Route.get('/users', 'UsersController.index')

  Route.post('/tickets', 'TicketsController.create')

  Route.post('/tickets/:id/update', 'TicketsController.update')
  Route.post('/tickets/:id/assign', 'TicketsController.assign')
  Route.post('/tickets/:id/close', 'TicketsController.close')

  Route.get('/tickets', 'TicketsController.index')

}).middleware('auth')

Route.any('*', async () => {
  
  return {   
    return: '404',
    retrun_txt: 'not found'
  }
})
