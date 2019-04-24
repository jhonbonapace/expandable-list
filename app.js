var myApp = angular.module('myApp',[]);

myApp.controller('rootController', ['$scope', function($scope) {
  $scope.mockData = [
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

  $scope.exibeDetalhe = function (evt, numero) {   
    const register = $scope.mockData.find(function(elem, idx){
        return elem.numero == numero
    })

    let targetNode = evt.target
    if(evt.target.nodeName == "I"){
      targetNode = evt.target.parentElement
    }

    if(targetNode.firstElementChild.classList.contains('fa-angle-double-down')){
      targetNode.firstElementChild.classList.remove('fa-angle-double-down')
      targetNode.firstElementChild.classList.add('fa-angle-double-up')

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

      targetNode.parentElement.insertAdjacentHTML('afterend', `<tr class="ignore">
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

    }else if(targetNode.firstElementChild.classList.contains('fa-angle-double-up')){
      targetNode.firstElementChild.classList.remove('fa-angle-double-up')
      targetNode.firstElementChild.classList.add('fa-angle-double-down')

      targetNode.parentElement.nextElementSibling.remove()
    }
  }
}]);