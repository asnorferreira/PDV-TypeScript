import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";
import { send } from "../../../configs/services";
import { compilatorHtml } from "../../../utils/compilatorHtml";

interface IPedidoProduto {
  produto_id: number;
  quantidade_produto: number;
}

interface ICliente {
  id: number;
  nome: string;
  email: string;
}

export const postOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const produtos = await knex("produtos").select("*");

    const valor_total = pedido_produtos.reduce(
      (acc: number, item: IPedidoProduto): number => {
        const produto = produtos.find(
          (produto) => produto.id === item.produto_id
        );
        return acc + produto.valor * item.quantidade_produto;
      },
      0
    );

    const pedido = await knex("pedidos")
      .insert({
        cliente_id,
        observacao: observacao || null,
        valor_total,
      })
      .returning("id");

    const produtosPedidoQuery = pedido_produtos.map((item: IPedidoProduto) => {
      return knex("pedido_produtos")
        .insert({
          pedido_id: pedido[0].id,
          produto_id: item.produto_id,
          quantidade_produto: item.quantidade_produto,
          valor_produto: produtos.find(
            (produto) => produto.id === item.produto_id
          ).valor,
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

    const cliente: ICliente | undefined = await knex<ICliente>("clientes")
      .where("id", cliente_id)
      .first();
    if (cliente) {
      const html = await compilatorHtml("./src/template/index.html", {
        nameuser: cliente.nome,
      });
      await send(cliente.email, "Confirmação de Pedido", html);
    }

    return res.status(200).json(retorno);
  } catch (error) {
    throw new ApiError("Error while creating the order of items", 500);
  }
};
