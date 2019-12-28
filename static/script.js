   /**
   * JONATHAN PASTAS
   */

    var idTarea;
	var idVerTarea;

	/**
	* METODO AJAX : PARA CORRER LA FUNCION OBTENER DATOS AL MOMENTO QUE SE EJECUTE LA APP
	*/
    $(document).ready(function(){
      obtener();
     });

	/**
	* METODO AJAX (PETICION GET) : OBTIENE LA INFORMACION DE UN JSON HACIA UNA TABLA (ESTOS DATOS TAMBIEN SE ENCUENTRAN EN LA BASE DE DATOS
	*/
  function obtener(){
    $.ajax({
       url:'http://192.168.146.131:5000/api/v2.0/tareas',
       type:'GET',
       contentType:"application/json",
       dataType:'json',
       success: function(data){

            var i = 0;
            var info = '<table class="table"><thead class="thead-dark"><tr><th scope="col"><center>#</center></th><th scope="col"><center>DETALLE</center></th><th scope="col"><center>ACCIONES DE TAREAS</center></th></tr></thead>';

          $.each(data, function(i, value) {

                info += ('<tr>');
                info += ('<td><center>' + value.id + '</center></td>');
                info += ('<td><center>' + value.titulo + '</center></td>');
                info += ('<td><div class="alert alert-dark" role="alert"><center><div class="btn-group"><button id="" type="button" class="btn btn-danger" onclick="eliminar('+value.id+');">Borrar</button> <button type="button" class="btn btn-warning">Hecho</button> <button type="button" class="btn btn-info" onclick="mostrar_datos('+value.id+');">Ver</button></div></center></div></td>');
                info += ('</tr>');

          });
          info += '</table>';
            $('#tableContainer').html(info);

       }
      })
     }

    /**
	* FUNCION JS : EJECUTA UN AJAX EL CUAL LLAMA AL MODAL CON ID modal_ver Y DENTRO DE EL CORRE LA FUNCION ver_datos()
	*/
 function mostrar_datos(id){
       this.idVerTarea=id;
       $("#modal_ver").modal();
       $(document).ready(function(){
      	ver_datos();
  });
   }

   /**
	* METODO AJAX (PETICION GET) : OBTIENE LA INFORMACION DE UN JSON HACIA UN MODAL, EN ESTA PARTE SE OBTIENE LA INFO DE UNA
	* TAREA DETERMINADA
	*/

function ver_datos(){
    $.ajax({
       url:'http://192.168.146.131:5000/api/v2.0/tareas/'+this.idVerTarea,
       type:'GET',
       contentType:"application/json",
       dataType:'json',
       success: function(data){

            var i = 0;
            var ver = '<center><b> <h4>INFORMACIÓN DE LA TAREA </h4></b></center> ';

          $.each(data, function(i, value) {

                ver += ('<p> <b>ID :</b> ' + value.id + '</p>');
                ver += ('<p> <b>TITULO DE LA TAREA :</b>' + value.titulo + '</p>');
                ver += ('<p> <b>DESCRIPCIÓN DE LA TAREA :</b> ' + value.descripcion + '</p>');
                ver += ('<p> <b>ESTADO DE LA TAREA :</b> ' + value.hecho + '</p>');

          });
          ver += '<br>';
            $('#detalle').html(ver);
		  console.log(ver);
       }
      })
     }

    /**
	* METODO AJAX (PETICION DELETE) : SE ELIMINA LA INFORMACION DE UN JSON , EN ESTA PARTE SE ELIMINA LA INFO DE UNA
	* TAREA DETERMINADA
	*/


     function eliminar(id){
       this.idTarea=id;
       $("#modal_borrar").modal();
     }

     function eliminacion(){
        $.ajax({
               	type: 'DELETE',
                dataType: "json",
                url:'http://192.168.146.131:5000/api/v2.0/tareas/'+this.idTarea
              })
            .done(function(result, textStatus, jqXHR ) {
              console.log(textStatus);
               $("#modal_borrar").modal("hide");
              obtener();
              this.idTarea=null;

            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
            console.log(textStatus);
        });
     }
/*
     $(document).ready(function(){
		$('#btnguardar').click(function(){
		var datos=$('#newtarea').serialize();

			$.ajax({
				type:"GET",
				url:'http://127.0.0.1:5000/ingresodatos',
				data:datos,
				success:function(r){

				}
			});
			return false;

		});
     });

*/

    /**
	* METODO AJAX (PETICION POST) : SE CARGA LA INFORMACION INGRESADA DE UN MODAL AL JSON Y LA BASE DE DATOS
	*
	*/

     function nuevatarea(){
       var datosnuevos= {
        "titulo" : $("input#nombre").val(),
        "descripcion" : $("input#detalles").val(),
        "hecho" : $("input#hecho").val()
      };

      console.log(datosnuevos);
       $.ajax({
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        url: 'http://192.168.146.131:5000/api/v2.0/tareas',
        data: JSON.stringify(datosnuevos)
      })
      .done(function(result, textStatus, jqXHR ) {
        $("#modalingreso").modal("hide");
        obtener();
      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log(textStatus);
      });

      }
