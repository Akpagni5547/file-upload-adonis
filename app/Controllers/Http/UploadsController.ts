import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import { extname } from 'path'
import Env from '@ioc:Adonis/Core/Env'
import drive from "Config/drive";
var AWS = require('aws-sdk');
// import {streamToBuffer}from 'App/Services/convert-stream-to-buffer'
export default class UploadsController {
  public async index({response}: HttpContextContract) {
    var AwsS3 = require ('aws-sdk/clients/s3');
    const s3 = new AwsS3 ({
      accessKeyId: Env.get('S3_KEY'),
      secretAccessKey:  Env.get('S3_SECRET'),
      region:  Env.get('S3_REGION'),
    });

    var params = {
      Bucket: Env.get('S3_BUCKET'),
      Delimiter: '/',
      // Prefix: 's/5469b2f5b4292d22522e84e0/ms.files/'
     }

  //  await s3.listObjects(params, function(err, data) {
  //    console.log(data)
  //    return data
  //  });


    const listDirectories = params => {
      return new Promise ((resolve, reject) => {
        const s3params = {
          Bucket: Env.get('S3_BUCKET'),
          MaxKeys: 20,
          Delimiter: '/',
          Prefix: 'test1/'
        };
        s3.listObjectsV2 (s3params, (err, data) => {
          if (err) {
            reject (err);
          }
          resolve (data);
        });
      });
    };

    try {
      const data = await listDirectories(params)
      return response.json(data)
    } catch(e){
      return response.json(e)
    }

    // await listDirectories(params).then(async (data) => {
    //   console.log(data)
    // }).catch(e => console.log(e))


    // const s3= Drive.use('s3')
    // const test = await Drive.use('s3').list!('images')
    // // await Drive.use('s3').
    // const test = await Drive.list('upload').toArray()
    // console.log(test)
  }

  public async upload({ request }: HttpContextContract) {

// await Drive.use('s3').delete('test2/')
// await Drive.use('s3').delete('test3/')
// await Drive.use('s3').delete('test4/')
// await Drive.use('s3').delete('test5/')
// await Drive.use('s3').put('test2/', 'test2.png')
// await Drive.use('s3').put('test3/', 'test2.png')
// await Drive.use('s3').put('test4/', 'test2.png')
await Drive.use('s3').put('call_éé_\'/', '')
// await Drive.use('s3').put('test2/', '')
// await Drive.use('s3').put('test3/', '')
// await Drive.use('s3').put('test4/', '')
    // const coverImage = request.file("image");
  /*   try {
      if (coverImage)
       {
         await coverImage.moveToDisk(
          "images",
          {
            name: "cover.jpg",
          },
          "s3"
        );
        await coverImage.moveToDisk('upload/yo', {
          name: 'heliosz.jpg',
          contentType: 'image/jpg'
        }, 'local')


        // await streamToBuffer(coverImage).then(async (buffer) => {
        //   await Drive.use('s3').put('test', buffer, {
        //     visibility: 'public',
        //     contentType: 'image/png'
        //   })

        })
        await Drive.put('test', coverImage, {
          visibility: 'public',
          contentType: 'image/png'
        })

      }
    } catch (e) {
      console.log(e);
    } */
  }

  public async single({ request }: HttpContextContract) {
    // console.log(request.all())
    // const s3 = Drive.use('s3')
    // request.multipart.onFile('input_field_name', {}, (part) => {
    //   console.log(part)
    // })
    // await request.multipart.process()
    // const file = request.input('input_field_name')
    // if (file.hasErrors) {
    //   return file.errors
    // }
  }

  public async multiple({}: HttpContextContract) {}
  public async filemanager({ request, response }: HttpContextContract) {
    const location = request.param('*').join('/')

    const { size } = await Drive.getStats(location)

    response.type(extname(location))
    response.header('content-length', size)

    return response.stream(await Drive.getStream(location))
  }
}
