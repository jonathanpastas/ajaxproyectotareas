#JONATHAN PASTAS
from flask_restful import Resource, abort, request
from bdd import *

#CONEXION A LA BASE DE DATOS MEDIANTE PONY
db.bind('mysql',host='192.168.146.131',user='root',passwd='1234',db='tareas')
db.generate_mapping(create_tables=True)

def cargardb():
    #SE INICIA LA SESION PARA LA INSERCION DE LOS DATOS DENTRO DE LA
    #BASE DE DATOS.
    with orm.db_session:
        t1 = ListaTarea(
            titulo='Aprender NodeJS',
            descripcion='Es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación',
            hecho=False
        )
        t2 = ListaTarea(
            titulo='Desarrollar un aplicativo en Django',
            descripcion='Aplicativo de Django',
            hecho=False
        )
        t3 = ListaTarea(
            titulo='Aprender y Desarrollar en Google Cloud',
            descripcion='Seguir un curso acerca del mundo de Google Cloud',
            hecho=False
        )

class ListaTareas(Resource):
    def get(self):
        # $ curl -i -X GET http://localhost:5000/api/v2.0/tareas
        with orm.db_session:
            return {
                       item.id: {
                           'id': item.id,
                           'titulo': item.titulo,
                           'descripcion': item.descripcion,
                           'hecho': item.hecho
                       }
                       for item in ListaTarea.select()
                   }, 200

    def post(self):
        # $ curl -i -H "Content-Type: application/json" -X POST -d '{"titulo":"Investigar SOAP","descripcion":"Buscar
        # información sobre esta tecnología"}' http://localhost:5000/api/v2.0/tareas
        if not request.is_json:
            abort(404, message="La petición no se encuentra en formato application/json")

        with orm.db_session:
            item = ListaTarea(
                titulo=request.json['titulo'],
                descripcion=request.json['descripcion'],
                hecho=False
            )

        return {"tarea": item.to_dict()}, 201


class TareaItem(Resource):
    def get(self, tarea_id):
        # $ curl -i -X GET http://localhost:5000/api/v2.0/tareas/2
        try:
            with orm.db_session:
                tarea = ListaTarea[tarea_id]
                return {"tarea": tarea.to_dict()}, 200
        except orm.ObjectNotFound:
            abort(404, message="Tarea con id={} no existe".format(tarea_id))

    def put(self, tarea_id):
        # $ curl -i -H "Content-Type: application/json" -X PUT -d '{"titulo":"Desaprender SOAP","descripcion":"Olvidar
        # lo que sabemos de SOAP","hecho":true}' http://localhost:5000/api/v2.0/tareas/4
        if not request.is_json:
            abort(404, message="La petición no se encuentra en formato application/json")
        try:
            with orm.db_session:
                tarea = ListaTarea[tarea_id]
                tarea.titulo = request.json['titulo']
                tarea.descripcion = request.json['descripcion']
                tarea.hecho = request.json['hecho']
                return {"tarea": tarea.to_dict()}, 200
        except orm.ObjectNotFound:
            abort(404, message="Tarea con id={} no existe".format(tarea_id))

    def delete(self, tarea_id):
        # $ curl -i -X DELETE http://localhost:5000/api/v2.0/tareas/4
        try:
            with orm.db_session:
                tarea = ListaTarea[tarea_id]
                if tarea:
                    tarea.delete()
        except orm.ObjectNotFound:
            abort(404, message="Tarea con id={} no existe".format(tarea_id))
        return {'message': 'Tarea eliminada exitosamente'}, 200

