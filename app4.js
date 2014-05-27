var app = angular.module('miapp', ['ngDragDrop','nvd3ChartDirectives']);

    app.controller('micontrolador', function($scope,$http) {
      
       var solonombre=[];
       var solomes=[];
       var solosemana=[];

       function hasDimension(array, expr)
       // data = [3, 45.78]
        {
            for (var i = 0; i < array.length; i++) {
                var a = array[i];

                if(a === expr){
                    return true;
                }
            }
            return false;
        }
        /*
          $scope.men=solonombre ;
        
            var counter = 0;
    $scope.loadMore = function() {
        for (var i = 0; i < 5; i++) {
            $scope.items.push({id: counter});
            counter += 10;
        }
    };
    /*
       $scope.loadMore = function() {
         var last = $scope.men[$scope.men.length - 1];
         for(var i = 1; i <= $scope.men.length; i++) {
            $scope.men.push(last + i);
          }
          };*/
        /*
       function hasDimension1(solomes, expr)
        {
            for (var i = solomes.length - 1; i >= 0; i--) 
            {
                var d = solomes[i];
      
                if(d[i] == expr) 
                {
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        */ 
         var soloproductospe=[];
        $http({
            method: 'POST',
            cache: false,
            url: ' http://misc.inteligenciadeventas.com:8080/rest_api/json.php',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data: {'fields': 'A.NombreProducto,A.PrecioSinIGV,A.Linea,A.Tipo,A.SubCategoria,A.Cantidad', 'top':'TOP 100'}
        }).success(function(data, status)
        {  
          
             
            for (var i = data.length - 1; i >= 0; i--) {
                var d = data[i];
            
                if(!hasDimension(soloproductospe, d.NombreProducto.trim())){                   
                    soloproductospe.push(d.NombreProducto.trim());
                }
    
            };
           
      
        })
        .error(function(data, status)
        {
        
        });


        var solodistritos=[];
        $http({
            method: 'POST',
            cache: false,
            url: ' http://misc.inteligenciadeventas.com:8080/rest_api/json.php',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data: {'fields': 'A.CodigoCliente,B.Distrito,B.NombreCliente,B.TipoNegocio,B.Mercado,B.Giro' , 'top':'TOP 100'}
        }).success(function(data, status)
        {   
             
              /*
             
             var contadormcdo = 0;
             var contadorbode=0;*/
            for (var i = data.length - 1; i >= 0; i--) {
                var d = data[i];
                /*
               var numtiponegocio=[d.TipoNegocio];
                 if(d.TipoNegocio==="PTO MCDO"){
                    
                              contadormcdo=contadormcdo+1; 
                                
                           }
                    else if(d.TipoNegocio==="BODEGA"){

                       contadorbode=contadorbode+1; }
                       
                    numtiponegocio.push(contadorbode);
                    numtiponegocio.push(contadormcdo);    */      
                    
                     var detalles = [d.Mercado.trim(),d.TipoNegocio.trim(), d.Giro.trim()];
                
                if(!hasDimension(solodistritos, d.Distrito.trim())) {                          
                    solodistritos.push(d.Distrito.trim());
                    solodistritos[d.Distrito]=[];
                    solodistritos[d.Distrito].push(detalles);
                    //solodistritos[d.Distrito]=[];
                    //solodistritos[d.Distrito].push(numtiponegocio);
                }
                else{
                    solodistritos[d.Distrito].push(detalles);}
                
             }
             
              



         

               
            /*
            var distrito = "ANCON"
            function buscar(text){
              if(hasDimension(solodistritos.indexOf(texto)!==-1)){                   
                    console.log("solodistr encontrad")
                }
            }*/
           // console.log(solodistritos);

               //console.log(solonombre);
               //console.log(solonombre['CAMARENA MEJIA YESSENIA']);

          
        })
        .error(function(data, status)
        {
        
        });


         $http({
            method: 'POST',
            cache: false,
            url: 'http://192.168.1.170:8080/labs/REST_API/getVentas.php',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            data: {'mes_ini': '1', 'mes_fin':'12'}
        })
         .success(function(data, status)
        { 

             for (var i = data.length - 1; i >= 0; i--) {
                var d = data[i];

                var ventas = [nombremes(d.MES), d.venta];
                
            
                if(!hasDimension(solonombre, d.vendedor)){
                   
                    solonombre.push(d.vendedor);
                    solonombre[d.vendedor]=[];
                    solonombre[d.vendedor].push(ventas);
                }else{
                    solonombre[d.vendedor].push(ventas);
                }
              }
          // console.log(solonombre);
         })
        .error(function(data, status)
        {
        });
           
          $http({
              method: 'POST',
              cache: false,
              url: 'http://192.168.1.170:8080/labs/REST_API/getVentasDetalle.php',
              headers:{'Content-Type':'application/x-www-form-urlencoded'},
              data: {'mes_ini': '1', 'mes_fin':'12'}
          })
         
          .success(function(data, status)
          {
                              
              $scope.vendedores=data;            
                //PARA LA TABLA
                   for (var i = data.length - 1; i >= 0; i--) {
                  var v= data[i];
                

                  var mes =[v.Semana,v.venta];
                  // console.log(nombremes(v.MES));
                  if(!hasDimension(solomes, v.vendedor+nombremes(v.MES))){
                      solomes.push(v.vendedor+nombremes(v.MES));
                      solomes[v.vendedor+nombremes(v.MES)]=[];
                      solomes[v.vendedor+nombremes(v.MES)].push(mes);
                  }else{
                      // console.log(solomes[v.vendedor+nombremes(v.MES)]);
                      solomes[v.vendedor+nombremes(v.MES)].push(mes);
                  }   
              } 
                 //console.log(solonombre);
                 //console.log(solomes['CAMARENA MEJIA YESSENIA']);
          })
          .error(function(data, status)
          {
          
          });

          $scope.men=solonombre ;
           $scope.distrito=solodistritos;
          $scope.productos=soloproductospe;
        /*          
        $scope.asd=function(string)
        {
            console.log(string);

        }*/
        $scope.women = 
        ['Jane','Jill','Betty','Mary'
        ];
   
        $scope.ordenarPor = function(orden)
        {
            $scope.ordenseleccionado=orden;
          
        };

        $scope.addText = "";
         $scope.ultimo1=true;
        $scope.mostrartabla= function ()
        {
            $scope.ocultagrafico=true;
            $scope.ocultatitulo=true;
            $scope.muestratitutabla=true;
            $scope.desaparecebtn=true;
            $scope.mtitulo=true;
            $scope.ultimo=true;
            $scope.mtable1=true;
            $scope.aparecebotonn=true;
        };
       
          $scope.dropSuccessHandler1 = function($event,$data,array)
        { 
          $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
          alert("Producto");

        

         
        };
         /* $scope.dropSuccessHandler2 = function($event,$data,array)
        { 
          $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
          $scope.aparecetabla1xd=true;
          /*console.log($event);
          console.log($data);
          console.log(array);
          alert("Distrito");*/
         /* console.log(solodistritos[$data]);//solo llega el nombre
          console.log(solodistritos);
           $scope.mariano=solodistritos;
  
        };*/

        var nombremes=function(string){
                 switch(string){
                    case "1":return "Enero";break;
                    case "2":return "Febrero";break;
                    case "3":return "Marzo"; break;
                    case "4":return "Abril"; break;
                    case "5":return "Mayo";break;
                    case "6": return "Junio"; break;
                    case "7": return "Julio"; break;
                    case "8": return "Agosto"; break;
                    case "9": return "Septiembre"; break;
                    case "10": return "Octubre";break
                    case "11": return "Noviembre"; break;
                    case "12": return "Diciembre";break;      
                    }
                  };


        $scope.funcionfamily = function(){
              $scope.tabladc=true;
               var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");

// use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
var spendData = [
  {"Fecha":"06/12/2013","CodigoCliente":"020829","NombreCliente":"SERNA YCOCHEA YRMA CRISTINA             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"KLEENEX CLASSIC SURT. *6 X 24 PAQT      ","PrecioSinIGV":"22.2881","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"KLEENEX    ","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0003","NroFactura":"BO-0020268265"},
  {"Fecha":"09/12/2013","CodigoCliente":"000786","NombreCliente":"ESPINOZA ALVARADO VERONICA              ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO UNIFICADO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"KLEENEX DISPLAY *10 PACKS X 10 DISP     ","PrecioSinIGV":"3.9492","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"KLEENEX    ","Cantidad":".1000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1000","CodigoVendedor":"0008","NroFactura":"BO-0020269581"},
  {"Fecha":"06/12/2013","CodigoCliente":"000369","NombreCliente":"SINCHA  ACOSTA MANUEL                   ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0003","NroFactura":"BO-0020268266"},
  {"Fecha":"06/12/2013","CodigoCliente":"003112","NombreCliente":"CACERES CASAÑA MARIA ISABEL             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO SANTA MONICA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BON. SUAVE NARANJA X 2                  ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268264"},
  {"Fecha":"06/12/2013","CodigoCliente":"002447","NombreCliente":"ARGUIDE . ABEL                          ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":"97.4570","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268267"},
  {"Fecha":"06/12/2013","CodigoCliente":"010807","NombreCliente":"MONTAÑO CHAVARRIA FLORIANA OLIMPIA      ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268263"},
  {"Fecha":"06/12/2013","CodigoCliente":"000717","NombreCliente":"VILLANUEVA ROJAS LIZ MARILU             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LA ESPERANZA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020268268"},
  {"Fecha":"06/12/2013","CodigoCliente":"000717","NombreCliente":"VILLANUEVA ROJAS LIZ MARILU             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LA ESPERANZA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"23.2203","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020268268"},
  {"Fecha":"06/12/2013","CodigoCliente":"000717","NombreCliente":"VILLANUEVA ROJAS LIZ MARILU             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LA ESPERANZA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT DURAMAX *1 X 24 UNI (64HJ)        ","PrecioSinIGV":"7.9873","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0004","NroFactura":"BO-0020268268"},
  {"Fecha":"09/12/2013","CodigoCliente":"002013","NombreCliente":"RAMOS . OSCAR                           ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT SERV CORT *400HJ X 6 PAQ          ","PrecioSinIGV":"8.0509","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269570"},
  {"Fecha":"06/12/2013","CodigoCliente":"001039","NombreCliente":"DURAND . ROSA                           ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LA ESPERANZA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0004","NroFactura":"BO-0020268270"},
  {"Fecha":"09/12/2013","CodigoCliente":"010432","NombreCliente":"GUEVARA HUANCA JOSE                     ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO VIRGEN DE LAS MER","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269567"},
  {"Fecha":"09/12/2013","CodigoCliente":"010432","NombreCliente":"GUEVARA HUANCA JOSE                     ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO VIRGEN DE LAS MER","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"82.2034","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269567"},
  {"Fecha":"03/12/2013","CodigoCliente":"003144","NombreCliente":"SOTO . YENNY                            ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"82.2034","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266342"},
  {"Fecha":"06/12/2013","CodigoCliente":"001907","NombreCliente":"CERNA . YOLANDA                         ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"8.4746","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268257"},
  {"Fecha":"03/12/2013","CodigoCliente":"003910","NombreCliente":"RIVERA . NICEFORA                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO LA LIBERTAD","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"20.0848","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266341"},
  {"Fecha":"06/12/2013","CodigoCliente":"010902","NombreCliente":"LIMA PINALES YENIFFER                   ","Distrito":"COMAS                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268256"},
  {"Fecha":"06/12/2013","CodigoCliente":"010902","NombreCliente":"LIMA PINALES YENIFFER                   ","Distrito":"COMAS                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268256"},
  {"Fecha":"06/12/2013","CodigoCliente":"010902","NombreCliente":"LIMA PINALES YENIFFER                   ","Distrito":"COMAS                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268256"},
  {"Fecha":"09/12/2013","CodigoCliente":"001507","NombreCliente":"MEJIA . ELSA                            ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"57.2033","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269568"},
  {"Fecha":"06/12/2013","CodigoCliente":"005199","NombreCliente":"ARUBANCA VARGAS JHON                    ","Distrito":"PAMPAS                        ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"245.7577","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268255"},
  {"Fecha":"09/12/2013","CodigoCliente":"000090","NombreCliente":"GALVEZ MORENO MANUEL                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269569"},
  {"Fecha":"09/12/2013","CodigoCliente":"000090","NombreCliente":"GALVEZ MORENO MANUEL                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"20.0848","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269569"},
  {"Fecha":"03/12/2013","CodigoCliente":"019091","NombreCliente":"HERRERA . JANET                         ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266372"},
  {"Fecha":"09/12/2013","CodigoCliente":"002013","NombreCliente":"RAMOS . OSCAR                           ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":"9.9153","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269570"},
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":"19.8305","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269571"},
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT NAVIDEÑA DECORADA *80 X 16 UNI    ","PrecioSinIGV":"22.0339","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269571"},
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269572"},
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"220.3378","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269572"},
  {"Fecha":"09/12/2013","CodigoCliente":"019715","NombreCliente":"AVELLANEDA MUÑOZ DE QUINTANA ROSALIA    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT DURAMAX *1 X 24 UNI (64HJ)        ","PrecioSinIGV":"95.8475","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269573"},
  {"Fecha":"09/12/2013","CodigoCliente":"008877","NombreCliente":"ESPIRITU SOTO ANA MARIA                 ","Distrito":"ANCON                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269574"},
  {"Fecha":"09/12/2013","CodigoCliente":"021734","NombreCliente":"CONTRERAS ALIANO CELIA CARMEN           ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"OTROS","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"KLEENEX DISPLAY *10 PACKS X 10 DISP     ","PrecioSinIGV":"3.9492","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"KLEENEX    ","Cantidad":".1000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1000","CodigoVendedor":"0007","NroFactura":"BO-0020269575"},
  {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268246"},
  {"Fecha":"03/12/2013","CodigoCliente":"003910","NombreCliente":"RIVERA . NICEFORA                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO LA LIBERTAD","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266341"},
  {"Fecha":"03/12/2013","CodigoCliente":"003910","NombreCliente":"RIVERA . NICEFORA                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO LA LIBERTAD","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266341"},
  {"Fecha":"09/12/2013","CodigoCliente":"004746","NombreCliente":"RAMIREZ MENDOZA ANA                     ","Distrito":"VENTANILLA                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO TREBOL DEL PROGRESO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"127.1178","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0008","NroFactura":"BO-0020269577"},
  {"Fecha":"09/12/2013","CodigoCliente":"006870","NombreCliente":"ACUÑA MEJIA FRANCISCO                   ","Distrito":"VENTANILLA                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"42.3729","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0008","NroFactura":"BO-0020269578"},
  {"Fecha":"09/12/2013","CodigoCliente":"007774","NombreCliente":"GUILLEN QUISPE MARTA                    ","Distrito":"VENTANILLA                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0008","NroFactura":"BO-0020269579"},
  {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"220.3378","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268244"},
  {"Fecha":"09/12/2013","CodigoCliente":"007774","NombreCliente":"GUILLEN QUISPE MARTA                    ","Distrito":"VENTANILLA                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0008","NroFactura":"BO-0020269579"},
  {"Fecha":"09/12/2013","CodigoCliente":"007774","NombreCliente":"GUILLEN QUISPE MARTA                    ","Distrito":"VENTANILLA                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0008","NroFactura":"BO-0020269579"},
  {"Fecha":"09/12/2013","CodigoCliente":"021828","NombreCliente":"ARMAS AGUIRRE JULIA                     ","Distrito":"VENTANILLA                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO TREBOL DEL PROGRESO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"BON. SUAVE NARANJA X 2                  ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0008","NroFactura":"BO-0020269580"},
  {"Fecha":"03/12/2013","CodigoCliente":"019177","NombreCliente":"MAMANI APAZA ALICIA                     ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"40.1695","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266366"},
  {"Fecha":"03/12/2013","CodigoCliente":"019177","NombreCliente":"MAMANI APAZA ALICIA                     ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266366"},
  {"Fecha":"03/12/2013","CodigoCliente":"004487","NombreCliente":"TELLO GAMBOA JUSTO SALVADOR             ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"8.4746","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266365"},
  {"Fecha":"09/12/2013","CodigoCliente":"003469","NombreCliente":"PUMA LAYME MARINA                       ","Distrito":"VENTANILLA                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"50.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0008","NroFactura":"BO-0020269582"},
  {"Fecha":"03/12/2013","CodigoCliente":"003557","NombreCliente":"SANTOYO MARCA DE HUANATICO JULIA        ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266364"},
  {"Fecha":"03/12/2013","CodigoCliente":"003556","NombreCliente":"CHUNGA CALDERON LUCY                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266363"},
  {"Fecha":"03/12/2013","CodigoCliente":"003556","NombreCliente":"CHUNGA CALDERON LUCY                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"9.4915","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266363"},
  {"Fecha":"03/12/2013","CodigoCliente":"006115","NombreCliente":"ROJAS MARAPARA DE MARTINE MARITZA ESTHER","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266362"},
  {"Fecha":"09/12/2013","CodigoCliente":"001492","NombreCliente":"MARIATEGUI QUISPE DELIA                 ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SCOTT DURAMAX *1 X 24 UNI (64HJ)        ","PrecioSinIGV":"3.9936","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".0417","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0417","CodigoVendedor":"0009","NroFactura":"BO-0020269583"},
  {"Fecha":"09/12/2013","CodigoCliente":"001163","NombreCliente":"CARMEN PINTADO BALVINA - FERRETERIA     ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO TAMBO INGA","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269588"},
  {"Fecha":"03/12/2013","CodigoCliente":"003483","NombreCliente":"DORA JOYJA COYCA                        ","Distrito":"CARABAYLLO                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"57.2033","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266359"},
  {"Fecha":"03/12/2013","CodigoCliente":"003483","NombreCliente":"DORA JOYJA COYCA                        ","Distrito":"CARABAYLLO                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266359"},
  {"Fecha":"03/12/2013","CodigoCliente":"003483","NombreCliente":"DORA JOYJA COYCA                        ","Distrito":"CARABAYLLO                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266359"},
  {"Fecha":"09/12/2013","CodigoCliente":"001189","NombreCliente":"ESPINOZA OBREGON ROCIO                  ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO TAMBO INGA","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"93.2163","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269589"},
  {"Fecha":"09/12/2013","CodigoCliente":"001189","NombreCliente":"ESPINOZA OBREGON ROCIO                  ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO TAMBO INGA","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269589"},
  {"Fecha":"03/12/2013","CodigoCliente":"003568","NombreCliente":"MEZA CONDORI EVELYN JESUSA              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266357"},
  {"Fecha":"03/12/2013","CodigoCliente":"008270","NombreCliente":"CHILCE CANALES TORIBIO                  ","Distrito":"CALLAO                        ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO GAMBETA ROJO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020266339"},
  {"Fecha":"03/12/2013","CodigoCliente":"003301","NombreCliente":"SANTO QUISPE MELANIA                    ","Distrito":"CARABAYLLO                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266356"},
  {"Fecha":"09/12/2013","CodigoCliente":"000437","NombreCliente":"SOLANO . TERESA                         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CRUZ DE MOTUPE","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SCOTT SERV CORT *220HJ X 12 PAQ         ","PrecioSinIGV":"9.6610","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269591"},
  {"Fecha":"03/12/2013","CodigoCliente":"003560","NombreCliente":"BALDERA SANDOVAL MARIA ADELINA          ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"127.1178","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266355"},
  {"Fecha":"09/12/2013","CodigoCliente":"001491","NombreCliente":"MEDINA BRIONES JORGE                    ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CRUZ DE MAYO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"93.2163","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269594"},
  {"Fecha":"03/12/2013","CodigoCliente":"003913","NombreCliente":"VILLALVA CCANTO FABIAN                  ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266367"},
  {"Fecha":"03/12/2013","CodigoCliente":"005392","NombreCliente":"LARICO LARICO JENNY                     ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266351"},
  {"Fecha":"03/12/2013","CodigoCliente":"003913","NombreCliente":"VILLALVA CCANTO FABIAN                  ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"220.3378","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266367"},
  {"Fecha":"03/12/2013","CodigoCliente":"003913","NombreCliente":"VILLALVA CCANTO FABIAN                  ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0006","NroFactura":"BO-0020266367"},
  {"Fecha":"03/12/2013","CodigoCliente":"021231","NombreCliente":"CHAVEZ GAMBOA NELLY ERLINDA             ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SCOTT SERV CORT *400HJ X 6 PAQ          ","PrecioSinIGV":"8.0509","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266368"},
  {"Fecha":"03/12/2013","CodigoCliente":"018862","NombreCliente":"VALDIVIA RIVERA CICI BETTINA            ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"8.4746","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266348"},
  {"Fecha":"03/12/2013","CodigoCliente":"018862","NombreCliente":"VALDIVIA RIVERA CICI BETTINA            ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT PAÑOS LIMPIAMAX *5 X 24 PQT       ","PrecioSinIGV":"2.2528","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".0417","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0417","CodigoVendedor":"0004","NroFactura":"BO-0020266348"},
  {"Fecha":"03/12/2013","CodigoCliente":"003640","NombreCliente":"VILLANUEVA . DORIS                      ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"99.5802","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266347"},
  {"Fecha":"03/12/2013","CodigoCliente":"003640","NombreCliente":"VILLANUEVA . DORIS                      ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266347"},
  {"Fecha":"03/12/2013","CodigoCliente":"004122","NombreCliente":"NOVOA . LINA                            ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT SERV CORT *400HJ X 6 PAQ          ","PrecioSinIGV":"8.0509","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266346"},
  {"Fecha":"03/12/2013","CodigoCliente":"021231","NombreCliente":"CHAVEZ GAMBOA NELLY ERLINDA             ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"8.4746","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266368"},
  {"Fecha":"03/12/2013","CodigoCliente":"007667","NombreCliente":"AYALA CHUNGA REYNALDO                   ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"245.7577","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266370"},
  {"Fecha":"03/12/2013","CodigoCliente":"003906","NombreCliente":"CONDORI . RAFHAEL                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266344"},
  {"Fecha":"03/12/2013","CodigoCliente":"018995","NombreCliente":"SOTO MEDINA GUSTAVO ANDRES              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"20.0848","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266343"},
  {"Fecha":"03/12/2013","CodigoCliente":"018995","NombreCliente":"SOTO MEDINA GUSTAVO ANDRES              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266343"},
  {"Fecha":"06/12/2013","CodigoCliente":"001750","NombreCliente":"OSORIO AVILA MARIBEL                    ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":"97.4570","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268261"}
];

// normalize/parse data
var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
    d.venta =d.Cantidad*d.PrecioSinIGV;
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.venta);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreProducto;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.venta;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.venta;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,100]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);


    var datatable   = dc.dataTable("#dc-data-table");
datatable
    .dimension(yearDim)
    .group(function(d) {return d.año;})
    // dynamic columns creation using an array of closures
    .columns([
        function(d) { return d.date.getDate() + "/" + (d.date.getMonth() + 1) + "/" + d.date.getFullYear(); },
        function(d) {return d.NombreProducto;},
        function(d) {return d.PrecioSinIGV;},
        function(d) {return d.Cantidad;},        
        function(d) {return d.venta;}
    ]);
    


dc.renderAll();
        };
        $scope.funcioncomas = function(){
          $scope.detalledc=true;
          $scope.titulodc=true;
          $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
        var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");

// use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
var spendData = [
    {"Fecha":"06/12/2013","CodigoCliente":"002447","NombreCliente":"ARGUIDE . ABEL                          ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":"97.4570","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268267"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"PLENITUD PROTEC \"G\" *20 X 3 PQ          ","PrecioSinIGV":"245.7553","Linea":"ADULT    ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268245"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"PLENITUD PROTEC \"M\" *20 X 3 PQ          ","PrecioSinIGV":"310.1812","Linea":"ADULT    ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268245"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BONI.HUG.ACT/SEC S/M \"XXG               ","PrecioSinIGV":".0000","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"45.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"45.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268245"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BONIF. MUESTRA DE UP %GO                ","PrecioSinIGV":".0004","Linea":"OTROS    ","Tipo":"OTROS      ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268244"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES RECIEN NACIDO *20 X 10 PAQ      ","PrecioSinIGV":"338.9869","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268244"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"220.3378","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268244"},
    {"Fecha":"06/12/2013","CodigoCliente":"000368","NombreCliente":"LEON ZUÑIGA ROGGER RENE                 ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO SANTA ROSA INFANT","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BONIF. MUESTRA DE UP %GO                ","PrecioSinIGV":".0004","Linea":"OTROS    ","Tipo":"OTROS      ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268242"},
    {"Fecha":"06/12/2013","CodigoCliente":"000368","NombreCliente":"LEON ZUÑIGA ROGGER RENE                 ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO SANTA ROSA INFANT","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES UP&GO XG/XXG *50 X 2 PAQ        ","PrecioSinIGV":"302.3650","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"UP&GO      ","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268242"},
    {"Fecha":"06/12/2013","CodigoCliente":"000368","NombreCliente":"LEON ZUÑIGA ROGGER RENE                 ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO SANTA ROSA INFANT","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES UP&GO \"G\" *60 X 2 PAQ           ","PrecioSinIGV":"75.5913","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"UP&GO      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268242"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"70.7627","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268247"},
    {"Fecha":"06/12/2013","CodigoCliente":"001039","NombreCliente":"DURAND . ROSA                           ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LA ESPERANZA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0004","NroFactura":"BO-0020268270"},
    {"Fecha":"06/12/2013","CodigoCliente":"000710","NombreCliente":"VILCA SEGOVIA BERTHA                    ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"HUGGIES ACT/SEC S/M \"P\" *42 X 4 PAQ     ","PrecioSinIGV":"16.9492","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0004","NroFactura":"BO-0020268269"},
    {"Fecha":"06/12/2013","CodigoCliente":"000717","NombreCliente":"VILLANUEVA ROJAS LIZ MARILU             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LA ESPERANZA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT DURAMAX *1 X 24 UNI (64HJ)        ","PrecioSinIGV":"7.9873","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0004","NroFactura":"BO-0020268268"},
    {"Fecha":"06/12/2013","CodigoCliente":"000717","NombreCliente":"VILLANUEVA ROJAS LIZ MARILU             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LA ESPERANZA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"23.2203","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020268268"},
    {"Fecha":"06/12/2013","CodigoCliente":"000717","NombreCliente":"VILLANUEVA ROJAS LIZ MARILU             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LA ESPERANZA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020268268"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268246"},
    {"Fecha":"06/12/2013","CodigoCliente":"000369","NombreCliente":"SINCHA  ACOSTA MANUEL                   ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES NAT/CARE \"XG\" *44 X 4 PAQ       ","PrecioSinIGV":"131.3559","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268266"},
    {"Fecha":"06/12/2013","CodigoCliente":"000369","NombreCliente":"SINCHA  ACOSTA MANUEL                   ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES NAT/CARE \"XXG\" *40 X 4 PAQ      ","PrecioSinIGV":"131.3559","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268266"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"70.7627","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268247"},
    {"Fecha":"06/12/2013","CodigoCliente":"020829","NombreCliente":"SERNA YCOCHEA YRMA CRISTINA             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"KLEENEX CLASSIC SURT. *6 X 24 PAQT      ","PrecioSinIGV":"22.2881","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"KLEENEX    ","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0003","NroFactura":"BO-0020268265"},
    {"Fecha":"06/12/2013","CodigoCliente":"020829","NombreCliente":"SERNA YCOCHEA YRMA CRISTINA             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"KOTEX EVOL NOCTURNA *8 X 12 UNI         ","PrecioSinIGV":"31.0170","Linea":"FEMME","Tipo":"Oportunidad","SubCategoria":"EVOLUTION  ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268265"},
    {"Fecha":"06/12/2013","CodigoCliente":"020829","NombreCliente":"SERNA YCOCHEA YRMA CRISTINA             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"TOA HUM ACT/FRESH *48 X 24 UNI          ","PrecioSinIGV":"135.2542","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268265"},
    {"Fecha":"06/12/2013","CodigoCliente":"020829","NombreCliente":"SERNA YCOCHEA YRMA CRISTINA             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BON.KOTEX EVOL NOCTURNA                 ","PrecioSinIGV":".0000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268265"},
    {"Fecha":"06/12/2013","CodigoCliente":"003112","NombreCliente":"CACERES CASAÑA MARIA ISABEL             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO SANTA MONICA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BON. SUAVE NARANJA X 2                  ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268264"},
    {"Fecha":"06/12/2013","CodigoCliente":"003112","NombreCliente":"CACERES CASAÑA MARIA ISABEL             ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO SANTA MONICA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"KOTEX NORMAL *10 X 48UNI                ","PrecioSinIGV":"25.0000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0003","NroFactura":"BO-0020268264"},
    {"Fecha":"06/12/2013","CodigoCliente":"001751","NombreCliente":"URURI MASGO LUISA YOVANNA               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO SANTA MONICA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES UP&GO XG/XXG *50 X 2 PAQ        ","PrecioSinIGV":"38.0085","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"UP&GO      ","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0003","NroFactura":"BO-0020268262"},
    {"Fecha":"06/12/2013","CodigoCliente":"001751","NombreCliente":"URURI MASGO LUISA YOVANNA               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO SANTA MONICA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"TOA HUM CLASSIC/REFIL *70 X 24 UNI      ","PrecioSinIGV":".0000","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0003","NroFactura":"BO-0020268262"},
    {"Fecha":"06/12/2013","CodigoCliente":"001751","NombreCliente":"URURI MASGO LUISA YOVANNA               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO SANTA MONICA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES RECIEN NACIDO *20 X 10 PAQ      ","PrecioSinIGV":"20.4661","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".3000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".3000","CodigoVendedor":"0003","NroFactura":"BO-0020268262"},
    {"Fecha":"06/12/2013","CodigoCliente":"001750","NombreCliente":"OSORIO AVILA MARIBEL                    ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":"97.4570","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268261"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES UP&GO XG/XXG *50 X 2 PAQ        ","PrecioSinIGV":"377.9563","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"UP&GO      ","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268246"},
    {"Fecha":"06/12/2013","CodigoCliente":"002884","NombreCliente":"CRUZ . CARMEN                           ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO SANTA LUZMILA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BON.MUESTRAS KOTEX AMIGA                ","PrecioSinIGV":".0009","Linea":"OTROS    ","Tipo":"OTROS      ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268259"},
    {"Fecha":"06/12/2013","CodigoCliente":"002884","NombreCliente":"CRUZ . CARMEN                           ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO SANTA LUZMILA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0003","NroFactura":"BO-0020268259"},
    {"Fecha":"06/12/2013","CodigoCliente":"002884","NombreCliente":"CRUZ . CARMEN                           ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO SANTA LUZMILA","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"PLEN PRACTIPAÑAL GEL *10 X 24 PAQ       ","PrecioSinIGV":"15.0212","Linea":"ADULT    ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0003","NroFactura":"BO-0020268259"},
    {"Fecha":"06/12/2013","CodigoCliente":"000369","NombreCliente":"SINCHA  ACOSTA MANUEL                   ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0003","NroFactura":"BO-0020268266"},
    {"Fecha":"06/12/2013","CodigoCliente":"010902","NombreCliente":"LIMA PINALES YENIFFER                   ","Distrito":"COMAS                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268256"},
    {"Fecha":"06/12/2013","CodigoCliente":"010902","NombreCliente":"LIMA PINALES YENIFFER                   ","Distrito":"COMAS                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268256"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"70.7627","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268254"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"495.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268253"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"495.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268252"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"495.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268251"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"495.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268250"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"495.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268249"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"495.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268248"},
    {"Fecha":"06/12/2013","CodigoCliente":"000712","NombreCliente":"LEON ZUÑIGA EDWIN RICARDO               ","Distrito":"COMAS                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CENTRAL DE COMAS","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"353.8136","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268247"},
    {"Fecha":"06/12/2013","CodigoCliente":"004914","NombreCliente":"MATTA CALIXTO DINO YURI                 ","Distrito":"COMAS                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0003","NroFactura":"BO-0020268260"},
    {"Fecha":"06/12/2013","CodigoCliente":"010902","NombreCliente":"LIMA PINALES YENIFFER                   ","Distrito":"COMAS                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268256"}
];

// normalize/parse data
var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();


        };

        $scope.funcioncallao=function(){
          $scope.titulodc=true;
           $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData= [
  {"Fecha":"07/12/2013","CodigoCliente":"009549","NombreCliente":"JUAREZ . LARA                           ","Distrito":"CALLAO                        ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020268921"},
  {"Fecha":"07/12/2013","CodigoCliente":"009549","NombreCliente":"JUAREZ . LARA                           ","Distrito":"CALLAO                        ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020268921"},
  {"Fecha":"03/12/2013","CodigoCliente":"002039","NombreCliente":"ARAUJO LAZO OSCAR ARTURO                ","Distrito":"CALLAO                        ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO AMARILLO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"PLENITUD CLASSIC \"G\" *20 X 3 PAQ        ","PrecioSinIGV":"89.9153","Linea":"ADULT    ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020266338"},
  {"Fecha":"03/12/2013","CodigoCliente":"008270","NombreCliente":"CHILCE CANALES TORIBIO                  ","Distrito":"CALLAO                        ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO GAMBETA ROJO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020266339"},
  {"Fecha":"07/12/2013","CodigoCliente":"015111","NombreCliente":"PEREZ . ANGELA                          ","Distrito":"CALLAO                        ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"23.2203","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0009","NroFactura":"BO-0020268913"}
];
var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();

        };
        $scope.funcionlima=function(){
          $scope.titulodc=true;
        $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData= [

  {"Fecha":"03/12/2013","CodigoCliente":"000124","NombreCliente":"CANALES DIAZ JAVIER                     ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO INGENIERIA","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES NAT/CARE \"XXG\" *40 X 4 PAQ      ","PrecioSinIGV":".0000","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0008","NroFactura":"BO-0020266396"},
  {"Fecha":"03/12/2013","CodigoCliente":"000124","NombreCliente":"CANALES DIAZ JAVIER                     ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO INGENIERIA","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES UP&GO XG/XXG *50 X 2 PAQ        ","PrecioSinIGV":"152.0339","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"UP&GO      ","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0008","NroFactura":"BO-0020266396"},
  {"Fecha":"07/12/2013","CodigoCliente":"001826","NombreCliente":"COLONIA . LARRI                         ","Distrito":"LIMA                          ","TipoNegocio":"AMBULANTE","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"245.7577","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0009","NroFactura":"BO-0020268918"},
  {"Fecha":"07/12/2013","CodigoCliente":"001826","NombreCliente":"COLONIA . LARRI                         ","Distrito":"LIMA                          ","TipoNegocio":"AMBULANTE","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"122.8788","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0009","NroFactura":"BO-0020268919"},
  {"Fecha":"03/12/2013","CodigoCliente":"000124","NombreCliente":"CANALES DIAZ JAVIER                     ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO INGENIERIA","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE GOLD *2 X 10 UNI                  ","PrecioSinIGV":"213.5517","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"15.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"15.0000","CodigoVendedor":"0008","NroFactura":"BO-0020266397"},
  {"Fecha":"09/12/2013","CodigoCliente":"002585","NombreCliente":"BERAUN HUAMANI PAMELA                   ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO UNIFICADO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES ACT/SEC S/M \"P\" *42 X 4 PAQ     ","PrecioSinIGV":"16.9492","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0008","NroFactura":"BO-0020269576"},
  {"Fecha":"09/12/2013","CodigoCliente":"002585","NombreCliente":"BERAUN HUAMANI PAMELA                   ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO UNIFICADO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"KOTEX EVOL MALLA *10 X 12 UNI           ","PrecioSinIGV":"7.2670","Linea":"FEMME","Tipo":"Oportunidad","SubCategoria":"EVOLUTION  ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0008","NroFactura":"BO-0020269576"},
  {"Fecha":"03/12/2013","CodigoCliente":"002602","NombreCliente":"UTANI CCACCYA LUCIA ISABEL              ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"6.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"6.0000","CodigoVendedor":"0008","NroFactura":"BO-0020266406"},
  {"Fecha":"09/12/2013","CodigoCliente":"002351","NombreCliente":"BECERRA . MARLENE                       ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC LUIS ANGEL MONTES QUIBIO","NombreProducto":"PLENITUD CLASSIC \"M\" *20 X 3 PAQ        ","PrecioSinIGV":"76.2712","Linea":"ADULT    ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0011","NroFactura":"BO-0020269629"},
  {"Fecha":"03/12/2013","CodigoCliente":"002602","NombreCliente":"UTANI CCACCYA LUCIA ISABEL              ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"60.2543","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0008","NroFactura":"BO-0020266406"},
  {"Fecha":"03/12/2013","CodigoCliente":"001934","NombreCliente":"QUISPE MAYORDA NELIDA                   ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"TOA HUM SUPREME FLIP TOP *48 X 24 UNI   ","PrecioSinIGV":"13.3545","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0009","NroFactura":"BO-0020266409"},
  {"Fecha":"09/12/2013","CodigoCliente":"002585","NombreCliente":"BERAUN HUAMANI PAMELA                   ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO UNIFICADO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"KOTEX EVOL TELA *10 X 12 UNI            ","PrecioSinIGV":"7.2670","Linea":"FEMME","Tipo":"Oportunidad","SubCategoria":"EVOLUTION  ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0008","NroFactura":"BO-0020269576"},
  {"Fecha":"09/12/2013","CodigoCliente":"002585","NombreCliente":"BERAUN HUAMANI PAMELA                   ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO UNIFICADO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"BONF. KOTEX EVOLUTION TELA              ","PrecioSinIGV":".0000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0008","NroFactura":"BO-0020269576"},
  {"Fecha":"07/12/2013","CodigoCliente":"002463","NombreCliente":"TORRES SALAZAR MARCO ANTONIO            ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"114.4066","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0008","NroFactura":"BO-0020268906"},
  {"Fecha":"03/12/2013","CodigoCliente":"001456","NombreCliente":"PILLACA HUAMANI PASTOR                  ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MDO LA MERCED","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0009","NroFactura":"BO-0020266427"},
  {"Fecha":"09/12/2013","CodigoCliente":"000786","NombreCliente":"ESPINOZA ALVARADO VERONICA              ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO UNIFICADO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"TOA HUM R.N. FLIP TOP *48 X 24 UNI      ","PrecioSinIGV":"14.3362","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0008","NroFactura":"BO-0020269581"},
  {"Fecha":"09/12/2013","CodigoCliente":"000786","NombreCliente":"ESPINOZA ALVARADO VERONICA              ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO UNIFICADO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"KLEENEX DISPLAY *10 PACKS X 10 DISP     ","PrecioSinIGV":"3.9492","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"KLEENEX    ","Cantidad":".1000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1000","CodigoVendedor":"0008","NroFactura":"BO-0020269581"},
  {"Fecha":"09/12/2013","CodigoCliente":"001492","NombreCliente":"MARIATEGUI QUISPE DELIA                 ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"TOA HUM R.N. FLIP TOP *48 X 24 UNI      ","PrecioSinIGV":"21.5042","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".1250","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1250","CodigoVendedor":"0009","NroFactura":"BO-0020269583"},
  {"Fecha":"09/12/2013","CodigoCliente":"001492","NombreCliente":"MARIATEGUI QUISPE DELIA                 ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SCOTT DURAMAX *1 X 24 UNI (64HJ)        ","PrecioSinIGV":"3.9936","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".0417","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0417","CodigoVendedor":"0009","NroFactura":"BO-0020269583"},
  {"Fecha":"09/12/2013","CodigoCliente":"002001","NombreCliente":"CRUZADO USQUIANO ADRIANA FIDENCIA       ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020269585"},
  {"Fecha":"09/12/2013","CodigoCliente":"002587","NombreCliente":"GARCIA PEREZ EVER                       ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"TOA HUM ACT/FRESH *48 X 24 UNI          ","PrecioSinIGV":"22.5424","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".1667","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1667","CodigoVendedor":"0009","NroFactura":"BO-0020269587"},
  {"Fecha":"07/12/2013","CodigoCliente":"001948","NombreCliente":"SANDOVAL BARREDA CELINA DIONISIA        ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"BON. SUAVE NARANJA X 2                  ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0010","NroFactura":"BO-0020268947"},
  {"Fecha":"07/12/2013","CodigoCliente":"002463","NombreCliente":"TORRES SALAZAR MARCO ANTONIO            ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0008","NroFactura":"BO-0020268907"},
  {"Fecha":"07/12/2013","CodigoCliente":"002463","NombreCliente":"TORRES SALAZAR MARCO ANTONIO            ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"146.6170","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0008","NroFactura":"BO-0020268906"},
  {"Fecha":"07/12/2013","CodigoCliente":"002463","NombreCliente":"TORRES SALAZAR MARCO ANTONIO            ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"146.6170","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0008","NroFactura":"BO-0020268906"},
  {"Fecha":"07/12/2013","CodigoCliente":"002463","NombreCliente":"TORRES SALAZAR MARCO ANTONIO            ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"73.3085","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0008","NroFactura":"BO-0020268906"},
  {"Fecha":"07/12/2013","CodigoCliente":"002317","NombreCliente":"VARGAS INFANTE EMELINA                  ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0008","NroFactura":"BO-0020268905"},
  {"Fecha":"07/12/2013","CodigoCliente":"001098","NombreCliente":"PALOMINO ZEDANO VICTORIA                ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"40.1695","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0008","NroFactura":"BO-0020268903"},
  {"Fecha":"07/12/2013","CodigoCliente":"001098","NombreCliente":"PALOMINO ZEDANO VICTORIA                ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0008","NroFactura":"BO-0020268903"},
  {"Fecha":"07/12/2013","CodigoCliente":"005629","NombreCliente":"BARRA MANCILLA GUDELIA                  ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"TOA HUM ACT/FRESH *48 X 24 UNI          ","PrecioSinIGV":"16.9068","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".1250","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1250","CodigoVendedor":"0007","NroFactura":"BO-0020268894"},
  {"Fecha":"07/12/2013","CodigoCliente":"005629","NombreCliente":"BARRA MANCILLA GUDELIA                  ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"28.4746","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0007","NroFactura":"BO-0020268894"},
  {"Fecha":"07/12/2013","CodigoCliente":"005629","NombreCliente":"BARRA MANCILLA GUDELIA                  ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":".0000","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0007","NroFactura":"BO-0020268894"},
  {"Fecha":"07/12/2013","CodigoCliente":"005629","NombreCliente":"BARRA MANCILLA GUDELIA                  ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0007","NroFactura":"BO-0020268894"},
  {"Fecha":"03/12/2013","CodigoCliente":"001454","NombreCliente":"YAURI LA CRUZ ORTEGA EVA                ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"23.2203","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0009","NroFactura":"BO-0020266411"},
  {"Fecha":"03/12/2013","CodigoCliente":"006373","NombreCliente":"LEDESMA FLORES YRMA JOVITA              ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0009","NroFactura":"BO-0020266415"},
  {"Fecha":"03/12/2013","CodigoCliente":"001935","NombreCliente":"SANTIAGO CHIROQUE MICAELA               ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"BON. KOTEX TEENS STARS                  ","PrecioSinIGV":".0000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0009","NroFactura":"BO-0020266421"},
  {"Fecha":"07/12/2013","CodigoCliente":"001952","NombreCliente":"CHAVARIA MORENO HORTENCIA FLORENTINA    ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268854"},
  {"Fecha":"07/12/2013","CodigoCliente":"002161","NombreCliente":"PALOMINO  SANCHEZ    BRUNO              ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268860"},
  {"Fecha":"09/12/2013","CodigoCliente":"001163","NombreCliente":"CARMEN PINTADO BALVINA - FERRETERIA     ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO TAMBO INGA","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269588"},
  {"Fecha":"09/12/2013","CodigoCliente":"001189","NombreCliente":"ESPINOZA OBREGON ROCIO                  ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO TAMBO INGA","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"93.2163","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269589"},
  {"Fecha":"09/12/2013","CodigoCliente":"001189","NombreCliente":"ESPINOZA OBREGON ROCIO                  ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO TAMBO INGA","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269589"},
  {"Fecha":"09/12/2013","CodigoCliente":"001198","NombreCliente":"CHAMPI ILAHUALA CELIA                   ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CRUZ DE MAYO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES RECIEN NACIDO *20 X 10 PAQ      ","PrecioSinIGV":"27.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".4000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".4000","CodigoVendedor":"0009","NroFactura":"BO-0020269593"},
  {"Fecha":"09/12/2013","CodigoCliente":"001198","NombreCliente":"CHAMPI ILAHUALA CELIA                   ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CRUZ DE MAYO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES ACT/SEC S/M \"P\" *42 X 4 PAQ     ","PrecioSinIGV":"16.9492","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0009","NroFactura":"BO-0020269593"},
  {"Fecha":"09/12/2013","CodigoCliente":"001491","NombreCliente":"MEDINA BRIONES JORGE                    ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CRUZ DE MAYO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"93.2163","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269594"},
  {"Fecha":"05/12/2013","CodigoCliente":"002107","NombreCliente":"CUTIPA . LUCIANO                        ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 200 MILLAS","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"284.7458","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0004","NroFactura":"BO-0030007181"},
  {"Fecha":"05/12/2013","CodigoCliente":"002107","NombreCliente":"CUTIPA . LUCIANO                        ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 200 MILLAS","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"142.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0030007181"},
  {"Fecha":"05/12/2013","CodigoCliente":"002107","NombreCliente":"CUTIPA . LUCIANO                        ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 200 MILLAS","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"284.7458","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0004","NroFactura":"BO-0030007185"},
  {"Fecha":"03/12/2013","CodigoCliente":"005137","NombreCliente":"ORELLANA DE LA CRUZ FREDY SAUL          ","Distrito":"LIMA                          ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"TOA HUM CLASSIC/REFIL *70 X 24 UNI      ","PrecioSinIGV":"117.8814","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020266423"},
  {"Fecha":"03/12/2013","CodigoCliente":"001935","NombreCliente":"SANTIAGO CHIROQUE MICAELA               ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"KOTEX DAYS DUO PROT/NORMAL *120 X 12 UNI","PrecioSinIGV":"9.2161","Linea":"FEMME","Tipo":"Oportunidad","SubCategoria":"PROTECTORES","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0009","NroFactura":"BO-0020266421"},
  {"Fecha":"03/12/2013","CodigoCliente":"001935","NombreCliente":"SANTIAGO CHIROQUE MICAELA               ","Distrito":"LIMA                          ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"KOTEX TEENS STARS *10 X 24 UNI          ","PrecioSinIGV":"25.0000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020266421"}
];
var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();


        };

$scope.funcionpuente=function(){
  $scope.titulodc=true;
   $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData= [
  {"Fecha":"02/12/2013","CodigoCliente":"021488","NombreCliente":"LEON QUISPE GOYA MILAGRO                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"145.7668","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265720"},
  {"Fecha":"02/12/2013","CodigoCliente":"021488","NombreCliente":"LEON QUISPE GOYA MILAGRO                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"291.5336","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265720"},
  {"Fecha":"02/12/2013","CodigoCliente":"002816","NombreCliente":"GUERRA . MARIA                          ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"211.0169","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007094"},
  {"Fecha":"02/12/2013","CodigoCliente":"011024","NombreCliente":"FLORES . VICTORIA                       ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO LOS PORTALES","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"213.5593","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0006","NroFactura":"BO-0030007092"},
  {"Fecha":"02/12/2013","CodigoCliente":"000442","NombreCliente":"DIAZ ASENCIOS LEONIDAS                  ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN JOSE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265729"},
  {"Fecha":"09/12/2013","CodigoCliente":"005303","NombreCliente":"CHAUCA . MARTHA                         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020269586"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007090"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007089"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007088"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007087"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"422.0339","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"6.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"6.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007086"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"70.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007086"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007085"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007084"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"351.6949","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007083"},
  {"Fecha":"02/12/2013","CodigoCliente":"021802","NombreCliente":"LEON SANCHEZ JUANA ROSA                 ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"70.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007082"},
  {"Fecha":"02/12/2013","CodigoCliente":"021802","NombreCliente":"LEON SANCHEZ JUANA ROSA                 ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"140.6780","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007082"},
  {"Fecha":"02/12/2013","CodigoCliente":"021802","NombreCliente":"LEON SANCHEZ JUANA ROSA                 ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007081"},
  {"Fecha":"02/12/2013","CodigoCliente":"021802","NombreCliente":"LEON SANCHEZ JUANA ROSA                 ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007080"},
  {"Fecha":"02/12/2013","CodigoCliente":"021802","NombreCliente":"LEON SANCHEZ JUANA ROSA                 ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007079"},
  {"Fecha":"02/12/2013","CodigoCliente":"021802","NombreCliente":"LEON SANCHEZ JUANA ROSA                 ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007078"},
  {"Fecha":"02/12/2013","CodigoCliente":"021802","NombreCliente":"LEON SANCHEZ JUANA ROSA                 ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007077"},
  {"Fecha":"02/12/2013","CodigoCliente":"021802","NombreCliente":"LEON SANCHEZ JUANA ROSA                 ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"351.6949","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007076"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007075"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"422.0339","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"6.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"6.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007074"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"70.3390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007074"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007073"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007072"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"492.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007071"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"211.0169","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007070"},
  {"Fecha":"02/12/2013","CodigoCliente":"007316","NombreCliente":"HOYOS FERNANDEZ ADAN                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"211.0169","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007069"},
  {"Fecha":"02/12/2013","CodigoCliente":"001969","NombreCliente":"VEGA QUISPE DAVID                       ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN JOSE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"10.0424","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0003","NroFactura":"BO-0020265728"},
  {"Fecha":"02/12/2013","CodigoCliente":"021801","NombreCliente":"CARDENAS DEGOLLAR CARLOS SAMUEL         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"351.6949","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0030007068"},
  {"Fecha":"09/12/2013","CodigoCliente":"019715","NombreCliente":"AVELLANEDA MUÑOZ DE QUINTANA ROSALIA    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT DURAMAX *1 X 24 UNI (64HJ)        ","PrecioSinIGV":"95.8475","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269573"},
  {"Fecha":"02/12/2013","CodigoCliente":"002454","NombreCliente":"CONDORI . LEYDI                         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"449.1525","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"50.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"50.0000","CodigoVendedor":"0006","NroFactura":"BO-0030007093"},
  {"Fecha":"02/12/2013","CodigoCliente":"021488","NombreCliente":"LEON QUISPE GOYA MILAGRO                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"291.5336","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265721"},
  {"Fecha":"02/12/2013","CodigoCliente":"000442","NombreCliente":"DIAZ ASENCIOS LEONIDAS                  ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN JOSE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"TOA HUM CLASSIC/REFIL *70 X 24 UNI      ","PrecioSinIGV":"58.9407","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0003","NroFactura":"BO-0020265729"},
  {"Fecha":"09/12/2013","CodigoCliente":"000090","NombreCliente":"GALVEZ MORENO MANUEL                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"20.0848","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269569"},
  {"Fecha":"02/12/2013","CodigoCliente":"000446","NombreCliente":"CORDERO SALAS RAUL                      ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"9.4915","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265722"},
  {"Fecha":"02/12/2013","CodigoCliente":"000446","NombreCliente":"CORDERO SALAS RAUL                      ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"23.2203","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265722"},
  {"Fecha":"02/12/2013","CodigoCliente":"018987","NombreCliente":"SENCCA VERA VILMA                       ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265723"},
  {"Fecha":"02/12/2013","CodigoCliente":"018987","NombreCliente":"SENCCA VERA VILMA                       ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"20.0848","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265723"},
  {"Fecha":"02/12/2013","CodigoCliente":"021487","NombreCliente":"QUISPE ROJAS TIMOTEO                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"93.2163","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265724"},
  {"Fecha":"09/12/2013","CodigoCliente":"000090","NombreCliente":"GALVEZ MORENO MANUEL                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269569"},
  {"Fecha":"02/12/2013","CodigoCliente":"001967","NombreCliente":"QUITO . RAQUEL                          ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN JOSE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265725"},
  {"Fecha":"02/12/2013","CodigoCliente":"001967","NombreCliente":"QUITO . RAQUEL                          ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN JOSE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"57.2033","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265725"},
  {"Fecha":"03/12/2013","CodigoCliente":"003803","NombreCliente":"CERVANTES GALARZA VICTOR                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO FAUCETT","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"BON. KOTEX TEENS STARS                  ","PrecioSinIGV":".0000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266438"},
  {"Fecha":"09/12/2013","CodigoCliente":"010432","NombreCliente":"GUEVARA HUANCA JOSE                     ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO VIRGEN DE LAS MER","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"82.2034","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269567"},
  {"Fecha":"09/12/2013","CodigoCliente":"010432","NombreCliente":"GUEVARA HUANCA JOSE                     ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO VIRGEN DE LAS MER","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269567"},
  {"Fecha":"03/12/2013","CodigoCliente":"003803","NombreCliente":"CERVANTES GALARZA VICTOR                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO FAUCETT","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"KOTEX TEENS STARS *10 X 24 UNI          ","PrecioSinIGV":"12.5000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0010","NroFactura":"BO-0020266438"},
  {"Fecha":"03/12/2013","CodigoCliente":"003803","NombreCliente":"CERVANTES GALARZA VICTOR                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO FAUCETT","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"KOTEX NORMAL *10 X 48UNI                ","PrecioSinIGV":"12.5000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":".1250","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1250","CodigoVendedor":"0010","NroFactura":"BO-0020266438"},
  {"Fecha":"02/12/2013","CodigoCliente":"001972","NombreCliente":"MORALES . ANGELICA                      ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265726"},
  {"Fecha":"02/12/2013","CodigoCliente":"007880","NombreCliente":"MIRANDA TRUJILLO ARMANDINA              ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265727"},
  {"Fecha":"03/12/2013","CodigoCliente":"003803","NombreCliente":"CERVANTES GALARZA VICTOR                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO FAUCETT","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"BONI.TOMA TODOS  SUAVE                  ","PrecioSinIGV":".0009","Linea":"OTROS    ","Tipo":"OTROS      ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266438"},
  {"Fecha":"02/12/2013","CodigoCliente":"007223","NombreCliente":"LAZO VILCHEZ ZORAIDA                    ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL DE PUENTE PIE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"KOTEX TEENS PROTECT *50 X 24 DISP       ","PrecioSinIGV":"111.7797","Linea":"FEMME","Tipo":"Oportunidad","SubCategoria":"PROTECTORES","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265719"},
  {"Fecha":"09/12/2013","CodigoCliente":"017549","NombreCliente":"TENORIO MACHUCA MARTHA                  ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES ACT/SEC S/M \"P\" *42 X 4 PAQ     ","PrecioSinIGV":"33.8983","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020269595"},
  {"Fecha":"03/12/2013","CodigoCliente":"003803","NombreCliente":"CERVANTES GALARZA VICTOR                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO FAUCETT","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"TOA HUM CLASSIC/REFIL *70 X 24 UNI      ","PrecioSinIGV":"19.6469","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".1667","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1667","CodigoVendedor":"0010","NroFactura":"BO-0020266438"},
  {"Fecha":"09/12/2013","CodigoCliente":"021734","NombreCliente":"CONTRERAS ALIANO CELIA CARMEN           ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"OTROS","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"KLEENEX DISPLAY *10 PACKS X 10 DISP     ","PrecioSinIGV":"3.9492","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"KLEENEX    ","Cantidad":".1000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1000","CodigoVendedor":"0007","NroFactura":"BO-0020269575"},
  {"Fecha":"03/12/2013","CodigoCliente":"003803","NombreCliente":"CERVANTES GALARZA VICTOR                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO FAUCETT","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"33.8983","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266438"},
  {"Fecha":"09/12/2013","CodigoCliente":"007321","NombreCliente":"ONOFRE . NANCY                          ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020269592"},
  {"Fecha":"09/12/2013","CodigoCliente":"000437","NombreCliente":"SOLANO . TERESA                         ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO CRUZ DE MOTUPE","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SCOTT SERV CORT *220HJ X 12 PAQ         ","PrecioSinIGV":"9.6610","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020269591"},
  {"Fecha":"02/12/2013","CodigoCliente":"001969","NombreCliente":"VEGA QUISPE DAVID                       ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN JOSE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"TOA HUM CLASSIC/REFIL *70 X 24 UNI      ","PrecioSinIGV":"29.4703","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0003","NroFactura":"BO-0020265728"},
  {"Fecha":"02/12/2013","CodigoCliente":"001969","NombreCliente":"VEGA QUISPE DAVID                       ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN JOSE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"HUGGIES ACT/SEC S/M \"P\" *42 X 4 PAQ     ","PrecioSinIGV":"67.7966","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265728"},
  {"Fecha":"02/12/2013","CodigoCliente":"001969","NombreCliente":"VEGA QUISPE DAVID                       ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN JOSE","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *6 X 8 PQ              ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020265728"},
  {"Fecha":"03/12/2013","CodigoCliente":"003803","NombreCliente":"CERVANTES GALARZA VICTOR                ","Distrito":"PUENTE PIEDRA                 ","TipoNegocio":"PTO MCDO","Mercado":"MDO FAUCETT","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0010","NroFactura":"BO-0020266438"}
];

var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();
};
$scope.funcionolivos=function(){
  $scope.titulodc=true;
 $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData= [
  {"Fecha":"05/12/2013","CodigoCliente":"018631","NombreCliente":"MEJIA RAFAE SAMUEL                      ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"550.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"50.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"50.0000","CodigoVendedor":"0008","NroFactura":"BO-0030007195"},
  {"Fecha":"06/12/2013","CodigoCliente":"010807","NombreCliente":"MONTAÑO CHAVARRIA FLORIANA OLIMPIA      ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268263"},
  {"Fecha":"04/12/2013","CodigoCliente":"000547","NombreCliente":"FUSTER ILDEFONSO MANUEL ALEJANDRO       ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BON.MUESTRAS KOTEX AMIGA                ","PrecioSinIGV":".0017","Linea":"OTROS    ","Tipo":"OTROS      ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0003","NroFactura":"BO-0020266966"},
  {"Fecha":"04/12/2013","CodigoCliente":"000547","NombreCliente":"FUSTER ILDEFONSO MANUEL ALEJANDRO       ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"119.4962","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"6.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"6.0000","CodigoVendedor":"0003","NroFactura":"BO-0020266966"},
  {"Fecha":"04/12/2013","CodigoCliente":"000547","NombreCliente":"FUSTER ILDEFONSO MANUEL ALEJANDRO       ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0003","NroFactura":"BO-0020266966"},
  {"Fecha":"04/12/2013","CodigoCliente":"000547","NombreCliente":"FUSTER ILDEFONSO MANUEL ALEJANDRO       ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"12.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"12.0000","CodigoVendedor":"0003","NroFactura":"BO-0020266966"},
  {"Fecha":"03/12/2013","CodigoCliente":"002972","NombreCliente":"AGATE YOLANDA                           ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"TOA HUM SUPREME FLIP TOP *48 X 24 UNI   ","PrecioSinIGV":"40.0636","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0007","NroFactura":"BO-0020266385"},
  {"Fecha":"05/12/2013","CodigoCliente":"003088","NombreCliente":"MARTEL ROSALES GOVER                    ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"498.3051","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007186"},
  {"Fecha":"05/12/2013","CodigoCliente":"003088","NombreCliente":"MARTEL ROSALES GOVER                    ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"498.3051","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"7.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"7.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007187"},
  {"Fecha":"03/12/2013","CodigoCliente":"002972","NombreCliente":"AGATE YOLANDA                           ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"TOA HUM R.N. FLIP TOP *48 X 24 UNI      ","PrecioSinIGV":"43.0085","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0007","NroFactura":"BO-0020266385"},
  {"Fecha":"03/12/2013","CodigoCliente":"002972","NombreCliente":"AGATE YOLANDA                           ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES NAT/CARE \"XXG\" *40 X 4 PAQ      ","PrecioSinIGV":"131.3559","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020266385"},
  {"Fecha":"03/12/2013","CodigoCliente":"002972","NombreCliente":"AGATE YOLANDA                           ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES PEPE \"P\" *30 X 8 PQTE           ","PrecioSinIGV":"58.0932","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0007","NroFactura":"BO-0020266385"},
  {"Fecha":"07/12/2013","CodigoCliente":"013243","NombreCliente":"CAYTUIRO SERRANO WALTER                 ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0007","NroFactura":"BO-0020268891"},
  {"Fecha":"07/12/2013","CodigoCliente":"013243","NombreCliente":"CAYTUIRO SERRANO WALTER                 ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020268891"},
  {"Fecha":"07/12/2013","CodigoCliente":"013243","NombreCliente":"CAYTUIRO SERRANO WALTER                 ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"57.2033","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0007","NroFactura":"BO-0020268891"},
  {"Fecha":"04/12/2013","CodigoCliente":"002631","NombreCliente":"RUIZ . RIGOBERTO                        ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"449.1525","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"50.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"50.0000","CodigoVendedor":"0006","NroFactura":"BO-0030007129"},
  {"Fecha":"04/12/2013","CodigoCliente":"002631","NombreCliente":"RUIZ . RIGOBERTO                        ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"269.4915","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"30.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"30.0000","CodigoVendedor":"0006","NroFactura":"BO-0030007128"},
  {"Fecha":"07/12/2013","CodigoCliente":"003996","NombreCliente":"RAMON . OLGA                            ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO PRIMAVERA","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020268922"},
  {"Fecha":"07/12/2013","CodigoCliente":"001532","NombreCliente":"OROPESA . ARTURO                        ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES NAT/CARE \"XXG\" *40 X 4 PAQ      ","PrecioSinIGV":"32.8390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0009","NroFactura":"BO-0020268920"},
  {"Fecha":"07/12/2013","CodigoCliente":"003872","NombreCliente":"LIMA PEREZ NOEMI                        ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0009","NroFactura":"BO-0020268917"},
  {"Fecha":"07/12/2013","CodigoCliente":"002078","NombreCliente":"BOTICA . ANGELES                        ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BOTICA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES RECIEN NACIDO *20 X 10 PAQ      ","PrecioSinIGV":"68.2203","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020268916"},
  {"Fecha":"07/12/2013","CodigoCliente":"002078","NombreCliente":"BOTICA . ANGELES                        ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BOTICA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"TOA HUM SUPREME FLIP TOP *48 X 24 UNI   ","PrecioSinIGV":"40.0636","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0009","NroFactura":"BO-0020268916"},
  {"Fecha":"05/12/2013","CodigoCliente":"003088","NombreCliente":"MARTEL ROSALES GOVER                    ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"213.5593","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007188"},
  {"Fecha":"05/12/2013","CodigoCliente":"003088","NombreCliente":"MARTEL ROSALES GOVER                    ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"213.5593","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007188"},
  {"Fecha":"07/12/2013","CodigoCliente":"007973","NombreCliente":"OJEDA GARAY FLOR DE MARIA               ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"TOA HUM CLASSIC/REFIL *70 X 24 UNI      ","PrecioSinIGV":"29.4703","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0009","NroFactura":"BO-0020268914"},
  {"Fecha":"07/12/2013","CodigoCliente":"000207","NombreCliente":"OCHOA . SIMEON                          ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020268912"},
  {"Fecha":"05/12/2013","CodigoCliente":"018631","NombreCliente":"MEJIA RAFAE SAMUEL                      ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"427.1186","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"6.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"6.0000","CodigoVendedor":"0008","NroFactura":"BO-0030007197"},
  {"Fecha":"05/12/2013","CodigoCliente":"018631","NombreCliente":"MEJIA RAFAE SAMUEL                      ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"284.7458","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0008","NroFactura":"BO-0030007196"},
  {"Fecha":"05/12/2013","CodigoCliente":"018631","NombreCliente":"MEJIA RAFAE SAMUEL                      ","Distrito":"LOS OLIVOS                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NANCY PONTE MENDIETA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"142.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0008","NroFactura":"BO-0030007196"}
];

 var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();
};
$scope.funcionmiguel=function(){
  $scope.titulodc=true;
   $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData= [
  {"Fecha":"03/12/2013","CodigoCliente":"003646","NombreCliente":"PAREDES . JORGE                         ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"LA PONDEROSA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"HUGGIES NAT/CARE \"XG\" *44 X 4 PAQ       ","PrecioSinIGV":"32.8390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0004","NroFactura":"BO-0020266349"},
  {"Fecha":"03/12/2013","CodigoCliente":"003910","NombreCliente":"RIVERA . NICEFORA                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO LA LIBERTAD","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266341"},
  {"Fecha":"03/12/2013","CodigoCliente":"003910","NombreCliente":"RIVERA . NICEFORA                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO LA LIBERTAD","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"18.9831","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266341"},
  {"Fecha":"03/12/2013","CodigoCliente":"003910","NombreCliente":"RIVERA . NICEFORA                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO LA LIBERTAD","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"20.0848","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266341"},
  {"Fecha":"03/12/2013","CodigoCliente":"004686","NombreCliente":"SANDOVAL . SAUL                         ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"TOA HUM CLASSIC/REFIL *70 X 24 UNI      ","PrecioSinIGV":"117.8814","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266441"},
  {"Fecha":"03/12/2013","CodigoCliente":"003936","NombreCliente":"AQUISE LAURA CELIA CARMEN               ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL LA MARINA","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SCOTT PAÑOS LIMPIAMAX *5 X 24 PQT       ","PrecioSinIGV":"4.5057","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0010","NroFactura":"BO-0020266440"},
  {"Fecha":"03/12/2013","CodigoCliente":"003936","NombreCliente":"AQUISE LAURA CELIA CARMEN               ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL LA MARINA","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"220.3378","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266440"},
  {"Fecha":"03/12/2013","CodigoCliente":"004037","NombreCliente":"MALLCCO MEJIA ISRAEL                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"80.3390","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266439"},
  {"Fecha":"03/12/2013","CodigoCliente":"004037","NombreCliente":"MALLCCO MEJIA ISRAEL                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"51.6949","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266439"},
  {"Fecha":"03/12/2013","CodigoCliente":"004037","NombreCliente":"MALLCCO MEJIA ISRAEL                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE GOLD *4 X 12 UNI                  ","PrecioSinIGV":"32.3725","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266439"},
  {"Fecha":"03/12/2013","CodigoCliente":"004037","NombreCliente":"MALLCCO MEJIA ISRAEL                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"8.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"8.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266439"},
  {"Fecha":"03/12/2013","CodigoCliente":"018995","NombreCliente":"SOTO MEDINA GUSTAVO ANDRES              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266343"},
  {"Fecha":"03/12/2013","CodigoCliente":"018995","NombreCliente":"SOTO MEDINA GUSTAVO ANDRES              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"20.0848","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266343"},
  {"Fecha":"03/12/2013","CodigoCliente":"003906","NombreCliente":"CONDORI . RAFHAEL                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266344"},
  {"Fecha":"03/12/2013","CodigoCliente":"004122","NombreCliente":"NOVOA . LINA                            ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT SERV CORT *400HJ X 6 PAQ          ","PrecioSinIGV":"8.0509","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266346"},
  {"Fecha":"03/12/2013","CodigoCliente":"018862","NombreCliente":"VALDIVIA RIVERA CICI BETTINA            ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT PAÑOS LIMPIAMAX *5 X 24 PQT       ","PrecioSinIGV":"2.2528","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".0417","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0417","CodigoVendedor":"0004","NroFactura":"BO-0020266348"},
  {"Fecha":"03/12/2013","CodigoCliente":"018862","NombreCliente":"VALDIVIA RIVERA CICI BETTINA            ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"8.4746","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266348"},
  {"Fecha":"03/12/2013","CodigoCliente":"003646","NombreCliente":"PAREDES . JORGE                         ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"LA PONDEROSA","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"TOA HUM SUPREME FLIP TOP *48 X 24 UNI   ","PrecioSinIGV":"6.6773","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".0417","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0417","CodigoVendedor":"0004","NroFactura":"BO-0020266349"},
  {"Fecha":"03/12/2013","CodigoCliente":"021161","NombreCliente":"MINGA FARCEQUE MARUJA                   ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"93.2163","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266437"},
  {"Fecha":"03/12/2013","CodigoCliente":"007248","NombreCliente":"PEREZ . TEODORO                         ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266436"},
  {"Fecha":"03/12/2013","CodigoCliente":"004685","NombreCliente":"CERVANTES GALARZA RICHARD               ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL LA MARINA","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0010","NroFactura":"BO-0020266444"},
  {"Fecha":"03/12/2013","CodigoCliente":"005392","NombreCliente":"LARICO LARICO JENNY                     ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266351"},
  {"Fecha":"03/12/2013","CodigoCliente":"011091","NombreCliente":"LARICO MAMANI LINA CHABELA              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"TOA HUM NAT REFRESH  *16 X16 UNI        ","PrecioSinIGV":"30.5085","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".7500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".7500","CodigoVendedor":"0004","NroFactura":"BO-0020266353"},
  {"Fecha":"03/12/2013","CodigoCliente":"011091","NombreCliente":"LARICO MAMANI LINA CHABELA              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"BON.TOA HUM NAT REFRESH *16             ","PrecioSinIGV":".0002","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"ACTIVE     ","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266353"},
  {"Fecha":"03/12/2013","CodigoCliente":"003568","NombreCliente":"MEZA CONDORI EVELYN JESUSA              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266357"},
  {"Fecha":"03/12/2013","CodigoCliente":"003568","NombreCliente":"MEZA CONDORI EVELYN JESUSA              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"TOA HUM ACT/FRESH *48 X 24 UNI          ","PrecioSinIGV":"33.8136","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0006","NroFactura":"BO-0020266357"},
  {"Fecha":"03/12/2013","CodigoCliente":"003913","NombreCliente":"VILLALVA CCANTO FABIAN                  ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"73.3085","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266360"},
  {"Fecha":"03/12/2013","CodigoCliente":"003913","NombreCliente":"VILLALVA CCANTO FABIAN                  ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"146.6170","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266360"},
  {"Fecha":"03/12/2013","CodigoCliente":"006115","NombreCliente":"ROJAS MARAPARA DE MARTINE MARITZA ESTHER","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266362"},
  {"Fecha":"03/12/2013","CodigoCliente":"005127","NombreCliente":"RODRIGUEZ GUTIERREZ CARLOS GUILLERMO    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL LA MARINA","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SCOTT NAVIDEÑA DECORADA *80 X 16 UNI    ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0010","NroFactura":"BO-0020266434"},
  {"Fecha":"03/12/2013","CodigoCliente":"005127","NombreCliente":"RODRIGUEZ GUTIERREZ CARLOS GUILLERMO    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL LA MARINA","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"HUGGIES NAT/CARE \"XXG\" *40 X 4 PAQ      ","PrecioSinIGV":"32.8390","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0010","NroFactura":"BO-0020266434"},
  {"Fecha":"03/12/2013","CodigoCliente":"005127","NombreCliente":"RODRIGUEZ GUTIERREZ CARLOS GUILLERMO    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL LA MARINA","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266434"},
  {"Fecha":"03/12/2013","CodigoCliente":"003556","NombreCliente":"CHUNGA CALDERON LUCY                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"9.4915","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266363"},
  {"Fecha":"03/12/2013","CodigoCliente":"006636","NombreCliente":"CANCHO YANCE LUCI CONSUELO              ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"TOA HUM ACT/FRESH *48 X 24 UNI          ","PrecioSinIGV":"16.9068","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".1250","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1250","CodigoVendedor":"0010","NroFactura":"BO-0020266432"},
  {"Fecha":"03/12/2013","CodigoCliente":"006637","NombreCliente":"LLANCE ZEVALLOS DE CANCHO FRANCISCA LUCI","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"60.2543","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"3.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"3.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266431"},
  {"Fecha":"03/12/2013","CodigoCliente":"006637","NombreCliente":"LLANCE ZEVALLOS DE CANCHO FRANCISCA LUCI","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE VERDE D.H. *6 X 8 PQ              ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266431"},
  {"Fecha":"03/12/2013","CodigoCliente":"006637","NombreCliente":"LLANCE ZEVALLOS DE CANCHO FRANCISCA LUCI","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"51.6949","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266431"},
  {"Fecha":"03/12/2013","CodigoCliente":"006637","NombreCliente":"LLANCE ZEVALLOS DE CANCHO FRANCISCA LUCI","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266431"},
  {"Fecha":"03/12/2013","CodigoCliente":"004685","NombreCliente":"CERVANTES GALARZA RICHARD               ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL LA MARINA","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0010","NroFactura":"BO-0020266444"},
  {"Fecha":"03/12/2013","CodigoCliente":"004329","NombreCliente":"GUERRERO RAMOS MARCO ANTONIO            ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"HUGGIES PEPE \"P\" *30 X 8 PQTE           ","PrecioSinIGV":"87.1398","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".7500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".7500","CodigoVendedor":"0010","NroFactura":"BO-0020266430"},
  {"Fecha":"03/12/2013","CodigoCliente":"003556","NombreCliente":"CHUNGA CALDERON LUCY                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266363"},
  {"Fecha":"03/12/2013","CodigoCliente":"003557","NombreCliente":"SANTOYO MARCA DE HUANATICO JULIA        ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266364"},
  {"Fecha":"03/12/2013","CodigoCliente":"004487","NombreCliente":"TELLO GAMBOA JUSTO SALVADOR             ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"HUGGIES RECIEN NACIDO *20 X 10 PAQ      ","PrecioSinIGV":"6.8220","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".1000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1000","CodigoVendedor":"0006","NroFactura":"BO-0020266365"},
  {"Fecha":"03/12/2013","CodigoCliente":"004487","NombreCliente":"TELLO GAMBOA JUSTO SALVADOR             ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"8.4746","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266365"},
  {"Fecha":"03/12/2013","CodigoCliente":"019177","NombreCliente":"MAMANI APAZA ALICIA                     ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266366"},
  {"Fecha":"03/12/2013","CodigoCliente":"019177","NombreCliente":"MAMANI APAZA ALICIA                     ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"40.1695","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266366"},
  {"Fecha":"03/12/2013","CodigoCliente":"003913","NombreCliente":"VILLALVA CCANTO FABIAN                  ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266367"},
  {"Fecha":"03/12/2013","CodigoCliente":"003913","NombreCliente":"VILLALVA CCANTO FABIAN                  ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"220.3378","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266367"},
  {"Fecha":"03/12/2013","CodigoCliente":"003913","NombreCliente":"VILLALVA CCANTO FABIAN                  ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0006","NroFactura":"BO-0020266367"},
  {"Fecha":"03/12/2013","CodigoCliente":"021231","NombreCliente":"CHAVEZ GAMBOA NELLY ERLINDA             ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SCOTT SERV CORT *400HJ X 6 PAQ          ","PrecioSinIGV":"8.0509","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266368"},
  {"Fecha":"03/12/2013","CodigoCliente":"021231","NombreCliente":"CHAVEZ GAMBOA NELLY ERLINDA             ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"8.4746","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266368"},
  {"Fecha":"03/12/2013","CodigoCliente":"019584","NombreCliente":"SAAVEDRA MONTEZA LUIS ALBERTO           ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"HUGGIES NAT/CARE \"XXG\" *40 X 4 PAQ      ","PrecioSinIGV":"65.6780","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0006","NroFactura":"BO-0020266369"},
  {"Fecha":"03/12/2013","CodigoCliente":"007667","NombreCliente":"AYALA CHUNGA REYNALDO                   ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"245.7577","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266370"},
  {"Fecha":"03/12/2013","CodigoCliente":"004667","NombreCliente":"VALLADAREZ . ROSA                       ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO SAN PEDRO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"HUGGIES UP&GO XG/XXG *50 X 2 PAQ        ","PrecioSinIGV":"76.0170","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"UP&GO      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266371"},
  {"Fecha":"03/12/2013","CodigoCliente":"019091","NombreCliente":"HERRERA . JANET                         ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0006","NroFactura":"BO-0020266372"},
  {"Fecha":"03/12/2013","CodigoCliente":"019091","NombreCliente":"HERRERA . JANET                         ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266372"},
  {"Fecha":"03/12/2013","CodigoCliente":"003560","NombreCliente":"BALDERA SANDOVAL MARIA ADELINA          ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"127.1178","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266355"},
  {"Fecha":"03/12/2013","CodigoCliente":"004684","NombreCliente":"ZAVALA CAMPOS HECTOR                    ","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO CENTRAL LA MARINA","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"PLEN PRACTIPAÑAL GEL *10 X 24 PAQ       ","PrecioSinIGV":"15.0212","Linea":"ADULT    ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0010","NroFactura":"BO-0020266445"},
  {"Fecha":"03/12/2013","CodigoCliente":"006637","NombreCliente":"LLANCE ZEVALLOS DE CANCHO FRANCISCA LUCI","Distrito":"SAN MIGUEL                    ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"6.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"6.0000","CodigoVendedor":"0010","NroFactura":"BO-0020266431"}
];


var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();
};
$scope.funcioncaballo=function(){
  $scope.titulodc=true;
 $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData=[
  {"Fecha":"03/12/2013","CodigoCliente":"003303","NombreCliente":"QUISPE SOTO LIZ                         ","Distrito":"CARABAYLLO                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SCOTT DURAMAX *1 X 24 UNI (64HJ)        ","PrecioSinIGV":"7.9873","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0006","NroFactura":"BO-0020266374"},
  {"Fecha":"03/12/2013","CodigoCliente":"003303","NombreCliente":"QUISPE SOTO LIZ                         ","Distrito":"CARABAYLLO                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"TOA HUM CLASSIC/REFIL *70 X 24 UNI      ","PrecioSinIGV":"9.8235","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0006","NroFactura":"BO-0020266374"},
  {"Fecha":"03/12/2013","CodigoCliente":"003303","NombreCliente":"QUISPE SOTO LIZ                         ","Distrito":"CARABAYLLO                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"BON. KOTEX TEENS STARS                  ","PrecioSinIGV":".0000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266374"},
  {"Fecha":"03/12/2013","CodigoCliente":"003483","NombreCliente":"DORA JOYJA COYCA                        ","Distrito":"CARABAYLLO                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"57.2033","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266359"},
  {"Fecha":"03/12/2013","CodigoCliente":"003483","NombreCliente":"DORA JOYJA COYCA                        ","Distrito":"CARABAYLLO                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266359"},
  {"Fecha":"03/12/2013","CodigoCliente":"003483","NombreCliente":"DORA JOYJA COYCA                        ","Distrito":"CARABAYLLO                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"46.6082","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266359"},
  {"Fecha":"03/12/2013","CodigoCliente":"003478","NombreCliente":"CARHUANCHO . LUIS                       ","Distrito":"CARABAYLLO                    ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0006","NroFactura":"BO-0020266358"},
  {"Fecha":"03/12/2013","CodigoCliente":"003301","NombreCliente":"SANTO QUISPE MELANIA                    ","Distrito":"CARABAYLLO                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"KOTEX DAYS DUO *15 X 24 UNI             ","PrecioSinIGV":"10.4449","Linea":"FEMME","Tipo":"Oportunidad","SubCategoria":"PROTECTORES","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0006","NroFactura":"BO-0020266356"},
  {"Fecha":"03/12/2013","CodigoCliente":"003301","NombreCliente":"SANTO QUISPE MELANIA                    ","Distrito":"CARABAYLLO                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266356"},
  {"Fecha":"03/12/2013","CodigoCliente":"003301","NombreCliente":"SANTO QUISPE MELANIA                    ","Distrito":"CARABAYLLO                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"BON.PROT KOTEX DAY X 15                 ","PrecioSinIGV":".0000","Linea":"FEMME","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0006","NroFactura":"BO-0020266356"},
  {"Fecha":"03/12/2013","CodigoCliente":"003303","NombreCliente":"QUISPE SOTO LIZ                         ","Distrito":"CARABAYLLO                    ","TipoNegocio":"PTO MCDO","Mercado":"MDO JOSE OLAYA","Giro":"MINORISTA","NombreVendedor":"KCC MILUSKA ORELLANA","NombreProducto":"KOTEX TEENS STARS *10 X 24 UNI          ","PrecioSinIGV":"12.5000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0006","NroFactura":"BO-0020266374"}
] ;

 var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();
};
$scope.funcionrimac=function(){
  $scope.titulodc=true;
   $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData= [
  {"Fecha":"03/12/2013","CodigoCliente":"003144","NombreCliente":"SOTO . YENNY                            ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SUAVE N EXTRA ROLLAZO 2 EN 1 X 12 UNI   ","PrecioSinIGV":"82.2034","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266342"},
  {"Fecha":"03/12/2013","CodigoCliente":"003118","NombreCliente":"ALBERTIS CALIXTO TARCILA                ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"BON. KOTEX TEENS STARS                  ","PrecioSinIGV":".0000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020266379"},
  {"Fecha":"03/12/2013","CodigoCliente":"003118","NombreCliente":"ALBERTIS CALIXTO TARCILA                ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"KOTEX TEENS STARS *10 X 24 UNI          ","PrecioSinIGV":"12.5000","Linea":"FEMME","Tipo":"Regular    ","SubCategoria":"","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0007","NroFactura":"BO-0020266379"},
  {"Fecha":"03/12/2013","CodigoCliente":"003118","NombreCliente":"ALBERTIS CALIXTO TARCILA                ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"9.4915","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020266379"},
  {"Fecha":"03/12/2013","CodigoCliente":"003118","NombreCliente":"ALBERTIS CALIXTO TARCILA                ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"11.6102","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020266379"},
  {"Fecha":"03/12/2013","CodigoCliente":"003640","NombreCliente":"VILLANUEVA . DORIS                      ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"BONIF. MAXIROLLO NARANJA X 1UND         ","PrecioSinIGV":".0000","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266347"},
  {"Fecha":"03/12/2013","CodigoCliente":"003640","NombreCliente":"VILLANUEVA . DORIS                      ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"SCOTT MAXI ROLLO NARANJA *1X12UND       ","PrecioSinIGV":"99.5802","Linea":"FAMILY   ","Tipo":"Oportunidad","SubCategoria":"SCOTT      ","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0004","NroFactura":"BO-0020266347"},
  {"Fecha":"03/12/2013","CodigoCliente":"001455","NombreCliente":"ARMAS . ANA                             ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020266424"},
  {"Fecha":"03/12/2013","CodigoCliente":"001455","NombreCliente":"ARMAS . ANA                             ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"9.4915","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0009","NroFactura":"BO-0020266424"},
  {"Fecha":"04/12/2013","CodigoCliente":"009126","NombreCliente":"GUERRERO NEYRA REYNA - BOTICA ALEJANDRO ","Distrito":"RIMAC                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"355.9322","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007133"},
  {"Fecha":"04/12/2013","CodigoCliente":"009126","NombreCliente":"GUERRERO NEYRA REYNA - BOTICA ALEJANDRO ","Distrito":"RIMAC                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"355.9322","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007132"},
  {"Fecha":"04/12/2013","CodigoCliente":"009126","NombreCliente":"GUERRERO NEYRA REYNA - BOTICA ALEJANDRO ","Distrito":"RIMAC                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XXG\" *48 X 2 PA","PrecioSinIGV":"355.9322","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007131"},
  {"Fecha":"04/12/2013","CodigoCliente":"009126","NombreCliente":"GUERRERO NEYRA REYNA - BOTICA ALEJANDRO ","Distrito":"RIMAC                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"M\" *72 X 2 PAQ ","PrecioSinIGV":"142.3729","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007130"},
  {"Fecha":"04/12/2013","CodigoCliente":"009126","NombreCliente":"GUERRERO NEYRA REYNA - BOTICA ALEJANDRO ","Distrito":"RIMAC                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"284.7458","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"4.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"4.0000","CodigoVendedor":"0007","NroFactura":"BO-0030007130"},
  {"Fecha":"03/12/2013","CodigoCliente":"003642","NombreCliente":"ARONI . LUIS                            ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"MDO MODELO SAN MIGUEL","Giro":"MINORISTA","NombreVendedor":"KCC ISABEL ESTEBAN PALACIOS","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"XG\" *52 X 2 PAQ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0004","NroFactura":"BO-0020266350"},
  {"Fecha":"03/12/2013","CodigoCliente":"003806","NombreCliente":"VILCA LOPEZ GINO                        ","Distrito":"RIMAC                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES NAT/CARE \"XXG\" *40 X 4 PAQ      ","PrecioSinIGV":"65.6780","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020266414"},
  {"Fecha":"03/12/2013","CodigoCliente":"003806","NombreCliente":"VILCA LOPEZ GINO                        ","Distrito":"RIMAC                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES PEPE \"P\" *30 X 8 PQTE           ","PrecioSinIGV":".0000","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0000","CodigoVendedor":"0009","NroFactura":"BO-0020266414"},
  {"Fecha":"03/12/2013","CodigoCliente":"002473","NombreCliente":"CAGUIA . CENOBIA                        ","Distrito":"RIMAC                         ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"93.2163","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0009","NroFactura":"BO-0020266420"}
];

 var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();
};
$scope.funcionancon=function(){
  $scope.titulodc=true;
    $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData= [
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"220.3378","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269572"},
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE NARANJA ECON. *2 X 10 UNI         ","PrecioSinIGV":"183.0537","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"20.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"20.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269572"},
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"HUGGIES UP&GO XG/XXG *50 X 2 PAQ        ","PrecioSinIGV":"76.0170","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"UP&GO      ","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269571"},
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":"19.8305","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"2.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"2.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269571"},
  {"Fecha":"09/12/2013","CodigoCliente":"002013","NombreCliente":"RAMOS . OSCAR                           ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT SERV CORT *400HJ X 6 PAQ          ","PrecioSinIGV":"8.0509","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269570"},
  {"Fecha":"09/12/2013","CodigoCliente":"001507","NombreCliente":"MEJIA . ELSA                            ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *2 X 10 UNI            ","PrecioSinIGV":"57.2033","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"5.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"5.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269568"},
  {"Fecha":"09/12/2013","CodigoCliente":"002986","NombreCliente":"D'PAZ VELA GLADYS                       ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT NAVIDEÑA DECORADA *80 X 16 UNI    ","PrecioSinIGV":"22.0339","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269571"},
  {"Fecha":"09/12/2013","CodigoCliente":"002013","NombreCliente":"RAMOS . OSCAR                           ","Distrito":"ANCON                         ","TipoNegocio":"PTO MCDO","Mercado":"MERCADO 3 REGIONES","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SCOTT SERV DIA A DIA *100 X 6 UNI       ","PrecioSinIGV":"9.9153","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269570"},
  {"Fecha":"09/12/2013","CodigoCliente":"008877","NombreCliente":"ESPIRITU SOTO ANA MARIA                 ","Distrito":"ANCON                         ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC ALEX MORETTI ESPINOZA","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0007","NroFactura":"BO-0020269574"}
];

var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll(); 
};




        $scope.funcionpampas = function(){
          $scope.titulodc=true;
           $scope.ultimo1=false;
         $scope.titulograficoxd=false;
          $scope.ocultagrafico=true;
          $scope.aparecetablaxd=false;
    var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
          spendData=[
  {"Fecha":"06/12/2013","CodigoCliente":"005199","NombreCliente":"ARUBANCA VARGAS JHON                    ","Distrito":"PAMPAS                        ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"TOA HUM ACT/FRESH *48 X 24 UNI          ","PrecioSinIGV":"33.8136","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".2500","CantidadDeVuelta":".0000","Cantidad_Efectiva":".2500","CodigoVendedor":"0003","NroFactura":"BO-0020268255"},
  {"Fecha":"06/12/2013","CodigoCliente":"005199","NombreCliente":"ARUBANCA VARGAS JHON                    ","Distrito":"PAMPAS                        ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC CHAVARRY RODRIGUEZ DIEGO JOSE","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"245.7577","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"10.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"10.0000","CodigoVendedor":"0003","NroFactura":"BO-0020268255"},
  {"Fecha":"09/12/2013","CodigoCliente":"002988","NombreCliente":"CANSAYA . DELIA                         ","Distrito":"PAMPAS                        ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"SUAVE VERDE D.H. *4 X 12 UNI            ","PrecioSinIGV":"25.8475","Linea":"FAMILY   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":"1.0000","CantidadDeVuelta":".0000","Cantidad_Efectiva":"1.0000","CodigoVendedor":"0010","NroFactura":"BO-0020269605"},
  {"Fecha":"03/12/2013","CodigoCliente":"004330","NombreCliente":"LEVITA . FRANCISCO                      ","Distrito":"PAMPAS                        ","TipoNegocio":"PTO MCDO","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC NICOLE MILLET","NombreProducto":"PLEN PRACTIPAÑAL GEL *10 X 24 PAQ       ","PrecioSinIGV":"10.0141","Linea":"ADULT    ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".1667","CantidadDeVuelta":".0000","Cantidad_Efectiva":".1667","CodigoVendedor":"0010","NroFactura":"BO-0020266433"},
  {"Fecha":"07/12/2013","CodigoCliente":"008643","NombreCliente":"GUTIERREZ CONDORI DE CORDOVA .          ","Distrito":"PAMPAS                        ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"HUGGIES ACT/SEC DUO S/M \"G\" *64 X 2 PAQ ","PrecioSinIGV":"37.2881","Linea":"INFANT   ","Tipo":"Regular    ","SubCategoria":"","Cantidad":".5000","CantidadDeVuelta":".0000","Cantidad_Efectiva":".5000","CodigoVendedor":"0009","NroFactura":"BO-0020268915"},
  {"Fecha":"07/12/2013","CodigoCliente":"008643","NombreCliente":"GUTIERREZ CONDORI DE CORDOVA .          ","Distrito":"PAMPAS                        ","TipoNegocio":"BODEGA","Mercado":"NO DEFINIDO","Giro":"MINORISTA","NombreVendedor":"KCC JOSE PIMENTEL GUTIERREZ","NombreProducto":"TOA HUM R. N. FLIP TOP *80 X 12 UNI     ","PrecioSinIGV":"11.5890","Linea":"INFANT   ","Tipo":"Oportunidad","SubCategoria":"WIPES      ","Cantidad":".0833","CantidadDeVuelta":".0000","Cantidad_Efectiva":".0833","CodigoVendedor":"0009","NroFactura":"BO-0020268915"}
]
var parseDate = d3.time.format("%m/%d/%Y").parse;
spendData.forEach(function(d) {
    d.date = parseDate(d.Fecha);
    d.Cantidad = d.Cantidad.match(/\d+/);
    d.año = d.date.getFullYear();
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.año;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Cantidad);}),
    nameDim  = ndx.dimension(function(d) {return d.NombreCliente;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Cantidad;}),
    spendHist    = spendDim.group().reduceCount();

yearRingChart
    .width(200).height(150)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50);

spendHistChart
    .width(700).height(250)
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .xAxisLabel("Cantidad vendida")
    .yAxisLabel("Count de ventas");

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .width(900).height(450)
    .dimension(nameDim) 
    .group(spendPerName)
    .elasticX(true);
    


dc.renderAll();


        };
        var datosdegrafico=$scope.vendedores;
          //   console.log(solonombre);
        $scope.onDrop = function($event,$data,array)
        { 
          
          
           $scope.ultimo1=false;
           $scope.titulograficoxd=true;
            $scope.aparecetablaxd=true;
            $scope.ocultagrafico=false;
              /*
               var cambiosCSS= {
                                background-color:red
                              };
                      $("#colorpanel").css(cambiosCSS);*/
              $scope.table=true;
             var datosdegrafico=$scope.vendedores;
             $scope.vendedoractual = $data ;
           // console.log($event);
           // console.log($data);
            //console.log(array);
          /*
            $scope.exampleData = 
            [{
                "key": "Nuevos soles",
                "values": [ [ "Enero", 5000] , [ "Febrero" , 3000] , [ "Marzo" , 7006] , [ "Abril", 8000], 
                [ "Mayo", 4050], [ "Junio", 10000], [ "Julio", 6000],[ "Agosto", 5050] ,[ "Septiembre",8000 ]
                ,[ "Octubre", 10000],[ "Noviembre", 13000],[ "diciembre",18000]]
            }];
            */
  $scope.titulodc=false;
            $scope.exampleData  = [{
                "key": "Nuevos soles",
                "values": solonombre[$data]
            }];
            $scope.exampleData1  = [{
                    "key": "Semanas",
                    "values": [ [ "1" , 100] , [ "2", 345] , [ "3" , 234] , [ "4" , 500] ]
                }];
           // $scope.xd1=solomes;
            $scope.xd=solonombre[$data];
            $scope.mariano=solodistritos;
              console.log(solonombre);
              console.log(solodistritos[$data]);

          

             $scope.legendColorFunction = function(){
                return function(d){
                    
                    return '#E01B5D';
                }
            };
            $scope.xFunction = function(){
                return function(d){
                   //  return nombremes(d[0]);
                    return (d[0]);
                }
            };

            $scope.yFunction = function(){
                return function(d){
                    return d[1];
                }
            };

            $scope.xAxisTickFormatFunction = function(){
                return function(d)
                   {
                    // return d3.time.format('%x')(new Date(d));
                    d.prop2
                    return d;
                   }
            };
            $scope.aparecebotonn=false;
        };
});
