(function() {
    let mockData = [
        {
            numero: '401245',
            status: 'AUTORIZADA',
            nome: 'Safeweb Segurança da Informação',
            documento: '01579286000174',
            emissao: '10/04/2019',
            cobrancas: [
                {
                    parcela: 1,
                    valor: 10,
                    situacao: 'PAGA'
                },
                {
                    parcela: 2,
                    valor: 10,
                    situacao: 'PENDENTE'
                },
                {
                    parcela: 3,
                    valor: 10,
                    situacao: 'PENDENTE'
                }
            ]
        },
        {
            numero: '503377',
            status: 'AUTORIZADA',
            nome: 'Jonathan Bonapace',
            documento: '02820442056',
            emissao: '20/02/2019',
            cobrancas: [
                {
                    parcela: 1,
                    valor: 50,
                    situacao: 'ATRASADA'
                },
                {
                    parcela: 2,
                    valor: 50,
                    situacao: 'PENDENTE'
                }
            ]
        }
    ];

    const listRoot = document.getElementsByClassName('listEvent')[0]
    let htmlRoot = ''
    for (let i = 0; i < mockData.length; i++){
        htmlRoot += `
        <tr>
            <td>
                <i class="fas fa-angle-double-down"></i>
            </td>
            <td>${mockData[i].numero}</td>
            <td>${mockData[i].status}</td>
            <td>${mockData[i].nome}</td>
            <td>${mockData[i].documento}</td>
            <td>${mockData[i].emissao}</td>
            <td>${mockData[i].cobrancas.length}</td>
        </tr>`;
    }
    listRoot.innerHTML = htmlRoot

    const elems = document.querySelectorAll('tbody>tr')
    for (let i = 0; i < elems.length; i++){
        elems[i].firstElementChild.addEventListener("click", function() {
            const numero = elems[i].firstElementChild.nextElementSibling.innerHTML
            const register = mockData.find(function(elem, idx){
               return elem.numero == numero
            })
            
            if(elems[i].firstElementChild.firstElementChild.classList.contains('fa-angle-double-down')){
                elems[i].firstElementChild.firstElementChild.classList.remove('fa-angle-double-down')
                elems[i].firstElementChild.firstElementChild.classList.add('fa-angle-double-up')

                let tbodystr = ''
                for (let j = 0; j < register.cobrancas.length; j++){
                    tbodystr += `
                    <tr>
                        <td>${register.cobrancas[j].parcela}</td>
                        <td>R$ ${register.cobrancas[j].valor}</td>
                        <td>${register.cobrancas[j].situacao}</td>
                    </tr>
                    `
                }

                elems[i].insertAdjacentHTML('afterend', `<tr class="ignore">
                    <td colspan="6" style="padding: 5px 30px 30px; border: none;">
                        <table class="table innerTable">
                            <thead>
                                <tr>
                                    <th>Parcela</th>
                                    <th>Valor</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tbodystr}
                            </tbody>
                        </table>
                    </td>
                </tr>`)

            }else if(elems[i].firstElementChild.firstElementChild.classList.contains('fa-angle-double-up')){
                elems[i].firstElementChild.firstElementChild.classList.remove('fa-angle-double-up')
                elems[i].firstElementChild.firstElementChild.classList.add('fa-angle-double-down')

                elems[i].nextElementSibling.remove()
            }
        })
    }
 })();