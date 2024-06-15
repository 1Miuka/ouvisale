export async function logar(username, password) {
  const response = await fetch("https://realm.mongodb.com/api/client/v2.0/app/data-dxiqe/auth/providers/local-userpass/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": username,
      "password": password
    })
  });

  const data = await response.json();
  sessionStorage.setItem('token', data.access_token);
  console.log(data)
}

export async function enviarMongo(manifestacao, nome, telefone, email, usuario, setor, destinatario, registro) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  const status = "Vazio";

  return fetch("https://sa-east-1.aws.data.mongodb-api.com/app/data-dxiqe/endpoint/data/v1/action/insertOne", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({
      "collection": "cliente",
      "database": "lucasTrabalho",
      "dataSource": "ProjetoUNI",
      "document": {
        "Manifestação": manifestacao,
        "Nome": nome,
        "Telefone": telefone,
        "Email": email,
        "Usuario": usuario,
        "Setor": setor,
        "Status": status,
        "Destinatário": destinatario,
        "Registro": registro,
        "Data": formattedDate
      }
    })
  });
}

export function findMongo() {
  return fetch("https://sa-east-1.aws.data.mongodb-api.com/app/data-dxiqe/endpoint/data/v1/action/find", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({
      "collection": "cliente",
      "database": "lucasTrabalho",
      "dataSource": "ProjetoUNI",
      "projection": {}
    })
  })
    .then(response => response.json());
}

export function deletaMongo(idMongo) {
  return fetch("https://sa-east-1.aws.data.mongodb-api.com/app/data-dxiqe/endpoint/data/v1/action/deleteOne", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({
      "collection": "cliente",
      "database": "lucasTrabalho",
      "dataSource": "ProjetoUNI",
      "filter": {
        "_id": { "$oid": idMongo }
      }
    })
  })
}

export function atualizaStatusMongo(idMongo, novoStatus) {
  return fetch("https://sa-east-1.aws.data.mongodb-api.com/app/data-dxiqe/endpoint/data/v1/action/updateOne", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({
      "collection": "cliente",
      "database": "lucasTrabalho",
      "dataSource": "ProjetoUNI",
      "filter": {
        "_id": { "$oid": idMongo }
      },
      "update": {
        "$set": {
          "Status": novoStatus
        }
      }
    })
  })
}
