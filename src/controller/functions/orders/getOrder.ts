import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";
import { NotFoundError } from "../../../middleware/functions/NotFoundError";

export const getOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const cliente = await knex("clientes").where("id", cliente_id).first();
      if (!cliente) {
        throw new NotFoundError("Client not found");
      }
    }

    let query = knex
      .select(
        "pedidos.id as pedido_id",
        "pedidos.valor_total",
        "pedidos.observacao",
        "pedidos.cliente_id",
        "clientes.nome as nome_cliente",
        "clientes.email as email_cliente",
        "clientes.cpf as cpf_cliente",
        "clientes.cep",
        "clientes.rua",
        "clientes.numero",
        "clientes.bairro",
        "clientes.cidade",
        "clientes.estado"
      )
      .from("pedidos")
      .leftJoin("clientes", "pedidos.cliente_id", "clientes.id");

    if (cliente_id) {
      query.where("pedidos.cliente_id", cliente_id);
    }

    const allOrders = await query;

    const result = allOrders.map((row) => ({
      pedido: {
        id: row.pedido_id,
        valor_total: row.valor_total,
        observacao: row.observacao,
        cliente: {
          id: row.cliente_id,
          nome: row.nome_cliente,
          email: row.email_cliente,
          cpf: row.cpf_cliente,
          cep: row.cep,
          rua: row.rua,
          numero: row.numero,
          bairro: row.bairro,
          cidade: row.cidade,
          estado: row.estado,
        },
      },
    }));

    return res.status(200).json(result);
  } catch (error) {
    throw new ApiError("Error while listing items", 500);
  }
};
