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
            }, {
                model: Pedido,
                where: {
                    id: req.params.id,
                },
                attributes: ['situacao'],
                include: [{
                    model: Fornecedor,
                    attributes: ['nome'],
                }],
            }],
            raw: true,
            nest: true,
        });

        const dataMap = data.map(test => {
            return {
                produto_nome: test.Produto.nome,
                produto_preco: test.Produto.preco,
                pedido_situacao: test.Pedido.situacao,
                pedido_fornecedor_nome: test.Pedido.Fornecedor.nome,
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

        pdf.create(htmlIndex, {}).toFile("./uploads/meupdf.pdf", (err, resp) => {
            if (err) {
                return res.status(400).json({ error: "Erro na criação do pdf" });
            }

            res.type('pdf');
            res.download('./uploads/meupdf.pdf');
        });
    }
    catch (error) {
        console.log(error);
    }
    };
};

export default new PDFController();