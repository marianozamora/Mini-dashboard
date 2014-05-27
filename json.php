<?php 
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token, X-Requested-With');

	function getPost(){
	    $request = file_get_contents('php://input');
	    return json_decode($request,true);
	}
	
	$getPost = getPost();
	$mes_ini = $getPost['mes_ini'];
	$mes_fin = $getPost['mes_fin'];
	$fields = $getPost['fields'];
	$top = $getPost['top'];

	// $fields = "A.CodigoCliente, B.NombreCliente, B.Distrito";
	// $top = "TOP 100";

	$list = explode( ',', $fields );

	$selectString = "";
	for ($i=0; $i < sizeof($list)-1; $i++) { 
		$selectString = $selectString." ".$list[$i].",";
	}
	$selectString = $selectString." ".$list[sizeof($list)-1];

	set_time_limit(9999999);

	$query = "
				SELECT ".$top." ".$fields."

				FROM
					(
						SELECT
							CAST(YEAR(V.Fecha) AS VARCHAR(4)) + ' - ' + 
								CASE  
									WHEN 10 > MONTH(V.Fecha) 
										THEN '0' 
									ELSE 
										'' 
								END			
							+ CAST(MONTH(V.Fecha) AS VARCHAR(2)) AS Mes,
							CONVERT(VARCHAR(10), V.Fecha, 103) AS Fecha, 
							V.CodigoCliente, 
							VEND.CodigoVendedor, 
							VEND.NombreVendedor, 
							P.NombreProducto,
							V.PrecioSinIGV, 
							P.SubGrupo3 AS Linea, 
							P.SubGrupo4 AS Tipo, 
							P.SubGrupo5 AS SubCategoria,
							CASE LEFT(V.NroFactura, 2)
								WHEN 'NC' 
									THEN 0 
								ELSE
									CASE 
										WHEN V.PrecioSinIGV >= 0 
											THEN V.Cantidad 
										ELSE V.Cantidad * -1 
									END 
							END AS Cantidad, 
							V.CantidadDeVuelta, 
							CASE LEFT(V.NroFactura, 2) 
								WHEN 'NC' 
									THEN 0 
								ELSE 
									(
										CASE 
											WHEN V.PrecioTotal >= 0 
												THEN V.Cantidad 
											ELSE V.Cantidad * 1 
										END
									) - V.CantidadDeVuelta 
							END AS Cantidad_Efectiva,
							V.NroFactura			
						FROM
							BISOFT..Ventas AS V
							INNER JOIN BISOFT..Productos AS P
						ON 
							V.CodigoProducto = P.CodigoProducto
							INNER JOIN BISOFT..Vendedores AS VEND
						ON 
							V.CodigoVendedor = VEND.CodigoVendedor
						WHERE
							P.Proveedor = 'KIMBERLY CLARK'
							AND V.Fecha BETWEEN { d '2013-12-01'} AND { d '2014-02-28'}
											
							AND V.CodigoVendedor IN 
								(
									SELECT DISTINCT 
										CodigoVendedor 
									FROM 
										BISOFT..Cuotas 
									WHERE 
										Numero_Mes_Periodo = MONTH(V.Fecha) 
										AND Numero_Anho_Periodo = YEAR(V.Fecha)
								)			
					) AS A
					INNER JOIN 
						(	
							SELECT DISTINCT 
								C.CodigoCliente, 
								C.NombreCliente, 
								C.Distrito, 
								C.Mercado, 
								C.TipoNegocio, 
								C.Giro 
							FROM 
								BISOFT..Clientes AS C
						) AS B
				ON 
					A.CodigoCliente = B.CodigoCliente;
	";
	$conn=odbc_connect('ventas2193','sa','Inv3rn4l14!');

	$rs=odbc_exec($conn,$query);

	if ($rs){

		$data = array();
		$i=0;

		while( $row = odbc_fetch_array($rs) ) {
	        //$data[$i] = $row;
	        $data[$i] = array_map('utf8_encode',$row);
	        $i++;
    	} 
    	echo json_encode($data);
	}
	

	odbc_close($conn);


 ?>