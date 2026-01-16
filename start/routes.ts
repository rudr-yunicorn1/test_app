/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// const PostsController = () => import('#controllers/posts_controller')
// const PostCommentsController = () => import('#controllers/post_comments_controller')

import router from '@adonisjs/core/services/router'

// router.get('/', async () => {
//   return {
//     hello: 'world',
//   }
// })

// router.get('/user',  //here iam using the magic string for lazy loading
// router.resource('post', PostsController) //here iam using the resource route it contain all the crud methord we can use it without methord definig
// router.shallowResource('post.comment', PostCommentsController) // here iam using the shallow resource to use it as only specific call
// // router.resource('users', UsersController).use(['*'], middleware.auth()) here we are using the middleware to use all the api

// form here iam gonna make the controller

router
  .group(() => {
    router.get('/show', '#controllers/patients_controller.show')
    router.post('/store', '#controllers/patients_controller.store')
    router.get('/show/:id', '#controllers/patients_controller.show_id')
    router.put('/update/:id', '#controllers/patients_controller.edit')
    router.delete('/delete/:id', '#controllers/patients_controller.distroy')
  })
  .prefix('/patient')

router
  .group(() => {
    router.get('/show', '#controllers/appointments_controller.show')
    router.post('/store', '#controllers/appointments_controller.store')
    router.get('/show/:id', '#controllers/appointments_controller.show_id')
    router.put('/update/:id', '#controllers/appointments_controller.edit')
    router.delete('/delete/:id', '#controllers/appointments_controller.distroy')
  })
  .prefix('/appointment')

router
  .group(() => {
    router.get('/vaccinated', '#controllers/tasks_controller.vaccinated')
    router.get('/doc_patient', '#controllers/tasks_controller.doc_patient')
    router.get('/age_details/:age', '#controllers/tasks_controller.age_details')
    router.get('/ststus/:id', '#controllers/tasks_controller.status')
  })
  .prefix('/task')
