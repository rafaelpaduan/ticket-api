import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index ({}: HttpContextContract) {

    const users = await User.all()

    return users
  }

  public async create ({ request }: HttpContextContract) {

    const data = request.only(["username", "email", "password"])

    if(await User.findBy('username', data.username)){

      return {

        return: '500',
        return_txt: 'esse nome de usuario ja existe'
      }
    } else {

      return await User.create(data)
    }
  }

  public async authenticate ({ request, auth }) {

    const { username, password } = request.all()
    const token = await auth.attempt(username, password)

    return token
  }
}
