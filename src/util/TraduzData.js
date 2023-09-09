function retornaMesPt(mesNumero){

    const arrayMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", 'Novembro', "Dezembro"]

    return arrayMeses[mesNumero]
}

function diaDaSemanaPt(diaDaSemana){

    const arrayDiasDaSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-feira", "Sábado"]

    return arrayDiasDaSemana[diaDaSemana]
}

export{retornaMesPt, diaDaSemanaPt}