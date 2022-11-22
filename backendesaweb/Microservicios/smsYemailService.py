import environment
import traceback
from twilio.rest import Client
from flask import Flask
from flask import request
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app=Flask(__name__)

@app.route("/")
def inicio():
    print("entro")
    test = os.enviro.get("Test")
    return test


@app.route("/sms")
def sms():
    try:
       account_sid = os.environ['TWILIO_ACCOUNT_SID']
       auth_token = os.environ['TWILIO_AUTH_TOKEN']
       client = Client(account_sid, auth_token)
       contenido = request.args.get('message')
       destino = request.args.get('phone')
       Message = client.messages.create(
            body = contenido,
           #from_= '   ',  numero celular
           to= '+57' + destino
            )
       print(message.sid)
       return "enviado correctamente"
    except Exception as e:
        print(e)
        return "ocurrio un error"

@app.route("/email")
def email():
    destino=request.args.get("correo_destino")
    asunto=request.args.get("asunto")
    mensaje=request.args.get("mensaje")
    message=Mail(
       # from_email="",
       to_emails= destino,
       subject=asunto,
       html_content=mensaje
       )
    
    try: 
        sg=SendGridAPIClient(os.environ("SENDGRIP_API_KEY"))
        reponse=sg.send(message)
        return "correo enviado exitosamente"
    except Exception as e:
        traceback.print_exc()
        print(e.message)
        return "error en el envio"
       
    app.run()
       
                    
