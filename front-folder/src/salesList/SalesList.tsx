import { useState } from "react";
import { mockVendas } from "./mockData";
import { ModalSalesEdit } from "./ModalSalesEdit";
import type { Venda } from "./types";
import { Button } from "@/components/ui/button";

const SalesList = () => {
  const [vendas, setVendas] = useState<Venda[]>(mockVendas);
  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (sale: Venda) => {
    setVendaSelecionada(sale);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setVendas((prev) => prev.filter((v) => v.id !== id));
  };

  const handleSave = (vendaAtualizada: Venda) => {
    setVendas((prev) =>
      prev.map((v) => (v.id === vendaAtualizada.id ? vendaAtualizada : v))
    );
    setIsModalOpen(false);
    setVendaSelecionada(null);
  };

  return (
    <div className="bg-neutral-200">
      <h1 className="text-2xl font-bold mb-4">Lista de Vendas</h1>
      
      <div className="flex flex-start">
        <Button
          onClick={() => window.location.href = "/nova-venda"}
          className="w-30 h-12 mb-4 ml-2"
          >
          Nova Venda
        </Button>
      </div>

      <ul className="space-y-2">
        {vendas.map((sale) => (
          <li
            key={sale.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p><strong>Nome:</strong> {sale.nome}</p>
              <p><strong>Valor:</strong> R$ {sale.valor}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(sale)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(sale.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && vendaSelecionada && (
        <ModalSalesEdit
          sale={vendaSelecionada}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SalesList;
