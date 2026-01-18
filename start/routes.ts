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

const PatientsController = () => import('#controllers/patients_controller')
const AppointmentController = () => import('#controllers/appointments_controller')
const TasksController = () => import('#controllers/tasks_controller')
const VaccinesController = () => import('#controllers/vaccines_controller')
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
    router
      .group(() => {
        router.get('/show', [PatientsController, 'show'])
        router.post('/store', [PatientsController, 'store'])
        router.get('/show/:id', [PatientsController, 'show_id'])
        router.put('/update/:id', [PatientsController, 'edit'])
        router.delete('/delete/:id', [PatientsController, 'destroy'])
        router.get('/export', [PatientsController, 'export'])
      })
      .prefix('/patient')

    router
      .group(() => {
        router.get('/show', [AppointmentController, 'show'])
        router.post('/store', [AppointmentController, 'store'])
        router.get('/show/:id', [AppointmentController, 'show_id'])
        router.put('/update/:id', [AppointmentController, 'edit'])
        router.delete('/delete/:id', [AppointmentController, 'destroy'])
        router.get('/pdfdownload', [AppointmentController, 'pdfdownload'])
      })
      .prefix('/appointment')

    router
      .group(() => {
        router.get('/show', [VaccinesController, 'show'])
        router.post('/store', [VaccinesController, 'store'])
        router.get('/show/:id', [VaccinesController, 'show_id'])
        router.put('/update/:id', [VaccinesController, 'edit'])
        router.delete('/delete/:id', [VaccinesController, 'destroy'])
      })
      .prefix('/vaccine')

    router
      .group(() => {
        //this will give us the vaccinated patient details
        router.get('/vaccinated', [TasksController, 'vaccinated'])
        //this will give us the patient belongs to which doctor
        router.get('/doc_patient', [TasksController, 'doc_patient'])
        //the below route will provide the details of the patient in particular age
        router.get('/age_details/:age', [TasksController, 'age_details'])
        //the below route will help us to change the status of appointment
        router.get('/status/:id', [TasksController, 'status'])
      })
      .prefix('/task')
  })
  .prefix('api')
