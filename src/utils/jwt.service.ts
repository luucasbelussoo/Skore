var jwt = require('jsonwebtoken');
var randtoken = require('rand-token');
//import { PermissionDeniedException } from '../exception/permissionDeniedException'

export class JwtService {


  async verifyJWT(oauthTokenHeader) {
    var token = oauthTokenHeader

    if (!token)
      return ({ auth: false, message: 'Token não informado.' });


    const validToken = jwt.verify(token, '371A23B2DB4DA42A13AC98BA6D547', function (err, decoded) {
      if (err) {
        return ({ auth: false });
      } else {
        const decode = decoded.name
        return ({ auth: true, message: 'Token valido.', role: decode })
      }
    });
    return validToken
  }

}


/* Token Administrador = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTY3NTM2MjY3MSwiZXhwIjoxNzA2OTIwMjcxfQ.zE1QUizLxftgngO9OJ0hEKbiUk0Ek-yPBp1NHU9JwD0" */
/* Token Estudante = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXN0dWRhbnRlIiwiaWF0IjoxNjc1MzYyNzY0LCJleHAiOjE3MDY5MjAzNjR9.zbIADUC7upeXBUD6STbSnvzGtlngMd3wwH5CyouCsBk */