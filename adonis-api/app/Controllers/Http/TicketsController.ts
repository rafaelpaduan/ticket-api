import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from 'App/Models/Ticket'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class TicketsController {
  public async index ({ request }: HttpContextContract) {

    const params = request.qs()

    if(Object.keys(params).length > 0){

      return (await Ticket.query().where(params).orderBy('id', 'asc'))

    } else {

      return Ticket.query().orderBy('id', 'desc')
    }
  }

  public async create ({ request, auth }: HttpContextContract) {

    const data = request.only(["description", "priority", "status"])
    const user = auth.user
    
    data["created_by"] = user.id
    
    return await Ticket.create(data)
  }

  public async update ({request, auth}: HttpContextContract) {

    const data = request.only(["description"])
    const ticket = await Ticket.find((request.params()).id)

    ticket.description = data.description
    
    return ticket.save()
  }

  public async assign ({request, auth}: HttpContextContract) {

    const user = auth.user
    const ticket = await Ticket.find((request.params()).id)

    ticket.responsible = user.id
    ticket.status = "PENDING"
    
    return ticket.save()
  }

  public async close ({request, auth}: HttpContextContract) {

    const user = auth.user
    const ticket = await Ticket.find((request.params()).id)

    if(ticket.responsible === user.id){

      ticket.status = "CLOSED"
      
      return ticket.save()
    } else {

      return {
        return: "403",
        return_txt: "voce nao e o responsavel por esse ticket"
      }
    }
  }
}
