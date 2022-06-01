import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from "@ioc:Adonis/Core/Drive";

export default class DirectUploadsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({request }: HttpContextContract) {
    request.multipart.onFile('input_field_name', {}, (part:any) => {
      // someSdk.uploadStream(part)
      Drive.use('s3').putStream('helios/', part)
    })
    await request.multipart.process()

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
