function Results({ className = "", message = {}, results = {}}){

    return (
    <div className={`text-center m-auto ${className}`}>
        <div><p className={`${message.styles}`}>{ message.message }</p></div>
        <div className="text-gray-100 font-bold text-lg mt-2">
            ¡Genial! Lograste escribir {results.cpm} caracteres por minuto.
        </div>
        <div className="text-gray-100 font-bold text-lg mt-2">
            Tuviste { results.success } aciertos.
        </div>
        <div className="text-gray-100 font-bold text-lg mt-2">
        Tuviste { results.errors } errores.
        </div>
        <div className="text-gray-100 font-bold text-lg mt-2">
        Te faltaron { results.extra } caracteres.
        </div>
        <div className="text-gray-100 font-bold text-lg mt-2">
        Total: { results.total }
        </div>
    </div>);

}

export default Results;