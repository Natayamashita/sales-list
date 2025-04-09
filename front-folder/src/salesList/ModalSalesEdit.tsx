import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Venda } from "./types";
import { Check, X } from "lucide-react";

type Props = {
  sale: Venda;
  onClose: () => void;
  onSave: (sale: Venda) => void;
};

export function ModalSalesEdit({ sale, onClose, onSave }: Props) {
  const [salesData, setFormData] = useState<Venda>(sale);

  useEffect(() => {
    setFormData(sale);
  }, [sale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...salesData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(salesData);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="">
      <DialogClose asChild>
        <button className="absolute right-4 top-4 text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </button>
      </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar Venda</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black">
          Sobrescreva os dados que você deseja editar.
        </DialogDescription>

        <input
          type="text"
          name="nome"
          value={salesData.nome}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          placeholder="Nome da venda"
        />
        <input
          type="number"
          name="valor"
          value={salesData.valor}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          placeholder="Valor"
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" /> Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Check className="w-4 h-4 mr-2" /> Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
