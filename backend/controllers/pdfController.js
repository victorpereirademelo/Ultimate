import pdf from "html-pdf";
import ProdutoPedido from "../models/ProdutoPedido";
import Produto from "../models/Produto";
import Pedido from "../models/Pedido";
import Fornecedor from "../models/Fornecedor";
import fs from "fs";

class PDFController {
    async index(req, res) {
        try {
            const data = await ProdutoPedido.findAll({
                where: {
                    pedido_id: req.params.id,
                },
                attributes: [],
                include: [{
                    model: Produto,
                    attributes: ['nome', 'preco'],
                    paranoid: false,
                }, {
                    model: Pedido,
                    attributes: ['situacao'],
                    include: {
                        model: Fornecedor,
                        attributes: ['nome'],
                        paranoid: false,
                    },
                }],
                raw: true,
                nest: true,
            });

            const dataMap = data.map(element => {
                return {
                    produto_nome: element.Produto.nome,
                    produto_preco: element.Produto.preco,
                    pedido_situacao: element.Pedido.situacao,
                    pedido_fornecedor_nome: element.Pedido.Fornecedor.nome,
                };
            });

            const head = fs.readFileSync('html-template/default-header.html', 'UTF-8');

            const html = dataMap.reduce((html, element) => {
                return html += `
                <tr>
                    <td>${element.produto_nome}</td>
                    <td>${element.produto_preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                </tr>
            `
            }, '');

            const htmlIndex = head + `
            <h3>Produtos</h3>
            <table class="default-table">
                <thead>
                    <tr>
                        <th>Nome:</th>
                        <th>Preço:</th>
                    </tr>
                </thead>
                <tbody>${html}</tbody>
            </table>
            <br>
            <h3>Pedido</h3>
            <table class="default-table">
                <thead>
                    <tr>
                        <th>Fornecedor:</th>
                        <th>Situação:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${dataMap[0].pedido_fornecedor_nome}</td>
                        <td>${dataMap[0].pedido_situacao}</td>
                    </tr>
                </tbody>
            </table>
        `

            pdf.create(htmlIndex, {}).toFile("./uploads/meupdf.pdf", err => {
                if (err) {
                    return res.status(400).json({ error: "Erro na criação do pdf" });
                }

                res.type('pdf');
                res.download('./uploads/meupdf.pdf');
            });
        }
        catch {
            return res.status(500).json({ error: "O pedido que você deseja imprimir o pdf não existe" });
        }
    };
};

export default new PDFController();