//= require jquery
//= require jquery-ui

$(document).ready(function() {
    $.each($("button"),function(i,b) {
        $(b).button();
    });
    if(localStorage.user) {
        setUser(localStorage.user);
    }
    else {
        $("#init").dialog({
            title: "Ingrese su nombre",
            modal: 'true',
            buttons:
              {"ok":function() {
                       $("#init").dialog('close');
                       var u=$("#usuario").val();
                       setUser(u);
                    }
              }
        });
    }
});

var user;
var userid;
function setUser(usr) {
    user=usr;
    $("#hh").text("Notas de "+usr);
    $("#cont").show();
    localStorage.user=usr;
    $.ajax('usuarios/byname',{
        dataType:"json",
        data: {nombre: usr},
        type: 'GET',
        success: function(data) {
            if(data) {
                userid=data.id;
                cargaNotas();
            }
            else {
                newUser(usr);
            }
        }
    });
}

function newUser(usr) {
    $.ajax('usuarios.json',{
        type: 'POST',
        dataType: 'json',
        data: {nombre:usr},
        success: function(data) {
            userid=data.id;
            cargaNotas();
        }
    });
}

function cargaNotas() {
    $.ajax('/nota/byuserid',{
        type: 'GET',
        data: {id:userid},
        dataType: 'json',
        success: function(data) {
            if(data) {
              $("#notas").children().remove();
              $.each(data,function(i,n) {
                htmlnota(n);
              });
            }
        }
    });
}

function htmlnota(n) {
    $("#notas").append(
        $("<li></li>")
          .attr('id','nota_'+n.id)
          .append(
            $("<input/>").attr('type','checkbox')
          )
          .append(
            $("<a></a>").attr('href','#')
                        .text(n.titulo)
                        .click(shownota)
          )
    );
}
function shownota() {
    var id=$(this).parent().attr('id').substring(5);
    $.ajax('nota/'+id+'.json',{
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $("<div></div>").append(
                $("<p></p>").text(data.contenido)
            ).dialog({
                title: data.titulo
            });
        }
    });
}

function newNota() {
    $('#titulo').val('');
    $('#contenido').val('');
    $('#nuevo').dialog({
        title: 'Nueva Nota',
        width: 350,
        height: 400,
        resizable: false,
        buttons: {
            "Ok" : function() {
                $(this).dialog('close');
                $.ajax('nota.json',{
                    type:'POST',
                    dataType:'json',
                    data:{
                        notum : {
                          titulo: $('#titulo').val(),
                          contenido: $('#contenido').val(),
                          usuario_id: userid
                        }
                    },
                    success: function(data) {
                        if(data && data.id) {
                            htmlnota(data);
                        }
                    }
                });
            },
            "Cancelar" : function() {
                $(this).dialog('close');
            }
        }
    });
    
}

function logout() {
    localStorage.removeItem('user');
    location.reload();
}

function delNota() {
    $.each($("#notas input[type='checkbox']:checked"),function(i,ch) {
        var id=$(ch).parent().attr("id").substring(5);
        $.ajax('nota/'+id+'.json',{
            type: 'DELETE',
            dataType: 'json',
            success: function() {
                $('#nota_'+id).remove();
            }
        });
    });
}





