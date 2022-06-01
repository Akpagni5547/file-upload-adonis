import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import FolderValidator from "App/Validators/FolderValidator";
const fs = require('fs');

export default class FoldermanagersController {
  public async index({ response }: HttpContextContract) {
    const listFolder = new Array();

    await Drive.list("./")
      .filter((item) => item.isFile === false)
      .recursive((current: any) => {
        listFolder.push(current);
        return current.location;
      })
      .toArray();

    const listFolderRange = listFolder.map((item) => {
      const parent = item.location.split("/");
      return {
        id: item.location,
        name: item.original.name,
        parent:
          parent[parent.length - 2] == undefined
            ? null
            : parent.slice(0, -1).join("/"),
      };
    });
    response.ok(listFolderRange);
  }

  public async store({ response, request }: HttpContextContract) {
    const { name, parent = "./" } = await request.validate(FolderValidator);
    const id =  parent === './' ? name : parent + '/' + name;
    // await Drive.put(id, 'a')
    const newFolder = './tmp/uploads/' + id;
    if (!fs.existsSync(newFolder)){
      fs.mkdirSync(newFolder);
  }
    return response.ok({
      id: id,
      name: name,
      parent: parent === './' ? null : parent,
    });
  }

  public async destroy({ response, params }: HttpContextContract) {
    const idFolderArray = params["*"];
    const idFolderString = idFolderArray.join("/");
    await Drive.delete(idFolderString);
    return response.noContent();
  }
}
