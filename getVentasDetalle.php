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

	$query = "
				SELECT
					A.vendedor, A.MES, A.Semana, SUM(A.venta) AS venta
				FROM (
						SELECT
							Vend.NombreVendedor AS vendedor, MONTH(V.Fecha) AS MES , DATEPART(WEEK, V.Fecha) AS Semana ,V.PrecioTotal AS venta
						FROM 
							ventas AS V
							INNER JOIN Vendedores AS Vend
								ON V.CodigoVendedor = Vend.CodigoVendedor
						WHERE
							MONTH(Fecha) BETWEEN ".$mes_ini." AND ".$mes_fin."
							AND YEAR(Fecha) = 2013
				) AS A
				GROUP BY
					A.vendedor, A.MES, A.Semana
				ORDER BY
					A.vendedor ASC, A.MES ASC, A.Semana ASC;

	";
	$conn=odbc_connect('Rest_Ventas','sa','satanesmipastor');

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