#JONATHAN PASTAS
from flask import Flask,render_template,request
from flask_restful import Api
from servicio import cargardb,ListaTareas,TareaItem


app = Flask(__name__)
api = Api(app)

api.add_resource(ListaTareas,'/api/v2.0/tareas')
api.add_resource(TareaItem, '/api/v2.0/tareas/<int:tarea_id>')

#CREAMOS LA RUTA POR DEFECTO

@app.route('/')
def index() -> 'html':
    return render_template('index.html',titulo='CARGA DE DATOS')

@app.route('/ingresar')
def cargar() -> str:
    cargardb()
    return "LOS DATOS SE CARGARON EXITOSAMENTE"



#ejecucion de la app
#app.run(debug=True)
app.run(host='0.0.0.0',port='5000',debug=True)
