#JONATHAN PASTAS
from pony import orm

db = orm.Database()
#Creacion de la Tabla en la Base de Datos
#Se crean las columnas que contendra la tabla
class ListaTarea(db.Entity):

    #Campo PK
    id = orm.PrimaryKey(int, auto=True)
    #Campos String que contendra el titulo,descripcion,hecho(tipo booleano)
    titulo = orm.Required(str)
    descripcion = orm.Required(str)
    hecho = orm.Required(int)

    def __str__(self):
        return self.titulo