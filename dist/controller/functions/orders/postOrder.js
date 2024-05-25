"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOrder = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const services_1 = require("../../../configs/services");
const compilatorHtml_1 = require("../../../utils/compilatorHtml");
const postOrder = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;
    try {
        const produtos = await (0, conection_1.default)("produtos").select("*");
        const valor_total = pedido_produtos.reduce((acc, item) => {
            const produto = produtos.find((produto) => produto.id === item.produto_id);
            return acc + produto.valor * item.quantidade_produto;
        }, 0);
        const pedido = await (0, conection_1.default)("pedidos")
            .insert({
            cliente_id,
            observacao: observacao || null,
            valor_total,
        })
            .returning("id");
        const produtosPedidoQuery = pedido_produtos.map((item) => {
            return (0, conection_1.default)("pedido_produtos")
                .insert({
                pedido_id: pedido[0].id,
                produto_id: item.produto_id,
                quantidade_produto: item.quantidade_produto,
                valor_produto: produtos.find((produto) => produto.id === item.produto_id).valor,
            })
                .returning("*");
        });
        const [pedidoProdutos] = await Promise.all(produtosPedidoQuery);
        const retorno = {
            pedido_id: pedido,
            cliente_id,
            observacao,
            valor_total,
            pedidoProdutos,
        };
        const cliente = await (0, conection_1.default)("clientes")
            .where("id", cliente_id)
            .first();
        if (cliente) {
            const html = await (0, compilatorHtml_1.compilatorHtml)("./src/template/index.html", {
                nameuser: cliente.nome,
            });
            await (0, services_1.send)(cliente.email, "Confirmação de Pedido", html);
        }
        return res.status(200).json(retorno);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while creating the order of items", 500);
    }
};
exports.postOrder = postOrder;
