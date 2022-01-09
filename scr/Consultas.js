/*
Muestra el importe total de ventas realizadas
*/

db.ventas.aggregate([
    {$group: 
        {_id: "totalVentas", 
        total: 
            {$sum:
                {$multiply:["$precioVenta", "$unidades"]},
                }
            }
        }
])

/*
Muestra los beneficios obtenidos por cada deporte permitiendo ver cual es el mejor.
*/

db.ventas.aggregate([
    {$group: 
        {_id: "$deporte", 
        beneficios: 
            {$sum:
                {$multiply:[{
                    $subtract: ["$precioVenta", "$precioFabrica"]},
                    "$unidades" 
                ]}    
            }         
        }
    }
])

/*
Muestra la cantidad de compras que ha hecho cada cliente
*/

db.ventas.aggregate([
    {$group : 
        {_id:"$cliente", 
        ventasRealizadas:{$sum:1}}
    }
])

/*
Muestra el beneficio obtenido por cada trabajador, permitiendo distinguir a los mejores.
*/

db.ventas.aggregate([
    {$group: 
        {_id: "$comercial", 
        ganancias: 
            {$sum:
                {$multiply:[{
                    $subtract: ["$precioVenta", "$precioFabrica"]},
                    "$unidades" 
                ]}    
            }         
        }
    }
])

/*
Muestra la cantidad de articulos vendidos, permitiendo ver cual es el mas vendido.
*/

db.ventas.aggregate([
    {$group:
        {_id: "$articulo", 
        articulosVendidos: {$sum:"$unidades"}}
    }
])

/*
Muestra la cantidad de ventas realizadas cada mes.
*/

db.ventas.aggregate([
    {$group:
        {_id: 
            {mes:{$month:"$fechaVenta"}, 
            año:{$year:"$fechaVenta"}},
        articulosVendidos: {$sum:"$unidades"}
    }}
])

/*
Muestra los beneficios que obtiene la empresa por cada una de sus ventas.    
*/

db.ventas.aggregate([
    {$project: 
        {beneficio:
            {$multiply:[{
                $subtract:["$precioVenta", "$precioFabrica"]},
                "$unidades"
            ]}
        }
    }
])

/*
Muestra el beneficio total de todas las ventas realizadas en el año 2019.
*/

db.ventas.aggregate([
    {$match: 
        {fechaVenta: {$gte: new Date("2019,01,01"), $lte: new Date("2019,12,31")
    }}},     
    {$group: 
        {_id: "beneficio2019", 
        total: 
            {$sum:
                {$multiply:[{
                    $subtract:["$precioVenta", "$precioFabrica"]},
                    "$unidades"
                ]}
            }
        }
    }
])

/*
Muestra la cantidad de articulos vendidos por deporte, permitiendo ver cual vende mas articulos.
*/

db.ventas.aggregate([
    {$group:
        {_id: "$deporte", 
        articulosVendidos: {$sum:"$unidades"}}
    }
])

/*
Muestra la cantidad de articulos vendidos por la empresa por un trabajador concreto.
*/

db.ventas.aggregate([
    {$match: 
        {comercial:"Francisco"}
    },     
    {$group:
        {_id: "ventasFrancisco", 
        unidadesVendidas: {$sum:"$unidades"}}
    }
])

/*
Muestra la cantidad de ventas realizadas por cada vendedor.
*/

db.ventas.aggregate([
    {$group : 
        {_id:"$comercial", 
        ventasRealizadas:{$sum:1}}
    }
])

/*
Muestra la media de articulos que vende un trabajador en concreto cada mes.
*/

db.ventas.aggregate([
    {$match: 
        {comercial:"Manuel"}
    }, 
    {$group:
        {_id:
            {mes:{$month:"$fechaVenta"}, 
            año:{$year:"$fechaVenta"}},
        mediaArticulosManuel: {$avg:"$unidades"}}
    }
])

/*
Muestra las mejores ventas realizadas por cada trabajador
*/

db.ventas.aggregate([
    {$group: 
        {_id: "$comercial", 
        Beneficio: 
            {$max:
                {$sum:
                    {$multiply:[{
                        $subtract: ["$precioVenta", "$precioFabrica"]},
                        "$unidades" 
                    ]}
                }          
            }
        }
    }
])

/*
Muestra el total de ventas realizadas con pago contra reembolso.
*/

db.ventas.aggregate([
    {$match:{contraReembolso:true}},
    {$group: 
        {_id: "totalVentas", 
        contraReembolso: 
            {$sum:
                {$multiply:["$precioVenta", "$unidades"]},
                }
            }
        }
])