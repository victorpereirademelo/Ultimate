// const array = [
//     {
//       Pedido: { id: 249, situacao: 'Aberto'},
//       Produto: { id: 10, nome: 'Geladeira' },
//     },
//     {
//       Pedido: { id: 249, situacao: 'Aberto'},
//       Produto: { id: 9, nome: 'Notebook' },
//     },
//   ];

//   console.log(array[0]['Produto']);
//   console.log(array[1]['Produto']);
//   console.log();
//   console.log(array[0].Produto);
//   console.log(array[1].Produto);

//   const obj = {
//       Pedido: { id: 249, situacao: 'Aberto'},
//       Produto: { id: 10, nome: 'Geladeira' },
//   };

//   console.log(obj['Produto']);
//   console.log(obj.Produto);

// const obj = {
//     exemplo: [
//         {
//             Pedido: { id: 249, situacao: 'Aberto'},
//             Produto: { id: 10, nome: 'Geladeira' },
//         },
//         {
//             Pedido: { id: 249, situacao: 'Aberto'},
//             Produto: { id: 9, nome: 'Notebook' },
//         }
//     ],
// };

// console.log(obj['exemplo']);
// console.log(obj.exemplo);

// console.log(obj['exemplo'][0]);
// console.log(obj.exemplo[0]);

// console.log(obj['exemplo'][0]['Produto']);
// console.log(obj.exemplo[0].Produto);

// const arrayObject = [
//     { id: 20, nome: 'A'},
//     { id: 21, nome: 'B'},
//     { id: 22, nome: 'C'},
//     { id: 23, nome: 'D'},
// ];

// const mapear = arrayObject.map(arr => arr.id)

// console.log(mapear);

// const adicionar = arrayObject.map(arr => {
//     arr.idade = `${arr.id} Anos`;

//     return arr
// });

// console.log(adicionar);

// const obj = {
//     falarOi(nome, sobrenome) {
//         return (nome + ' ' + sobrenome)
//     },
// };

// console.log(obj.falarOi('Victor', 'Pereira'));

// class teste {
//   static nome(nome) {
//       return nome
//   }
// }
// console.log(teste.nome('Victor'));

// const array = [
//     {
//         nome: "Victor",
//         idade: '21',
//     },
//     {
//         nome: "Eduarda",
//         idade: '20',
//     },
//     {
//         nome: "Aldo",
//         idade: '23',
//     },
// ];

// const arrayMap = array.map(arr => arr.nome);

// const arrayMap = array.map(arr => {
//     arr.teste = `testando ${arr.idade}`;

//     return arr
// });

// const arrayMap = array.map(arr => {
//     if (arr.idade === '21') {
//         arr.nome = "Victor Editado"
//     }

//     return arr
// });

// console.log(arrayMap);

// const obj = {
//     '1': {
//         nome: "Victor",
//         sobrenome: "Pereira"
//     },
//     '2': {
//         nome: "Rafael",
//         sobrenome: "Pereira"
//     }
// };

// console.log(Object.keys(obj));
// console.log(Object.values(obj));

// function teste () {
//     const nome = "Victor";
//     const sobrenome = "Pereira"

//     return {
//         nome,
//         sobrenome
//     }
// };

// console.log(teste().nome);
// console.log(teste().sobrenome);