import { useEffect, useState } from "react";
import { mockVendas } from "./mockData";
import { ModalSalesEdit } from "./ModalSalesEdit";
import type { Venda } from "./types";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SalesList = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [vendas, setVendas] = useState<Venda[][]>(mockVendas);
  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleEdit = (sale: Venda) => {
    setVendaSelecionada(sale);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setVendas((prev) =>
      prev
        .map((lista) => lista.filter((venda) => venda.id !== id))
        .filter((lista) => lista.length > 0) 
    );
  };
  

  const handleSave = (vendaAtualizada: Venda) => {
    console.log(vendaAtualizada)
    setVendas((prev) => prev.map((list : Venda[]) => list.map((v) => v.id === vendaAtualizada.id ? vendaAtualizada : v)));
    setIsModalOpen(false);
    setVendaSelecionada(null);
  };

  return (
    <div className=" backdrop-blur-xs p-8 rounded-4xl border-1 border-zinc-900 shadow-2xl text-neutral-300">
      <div className="">
        <h1 className="text-zinc-300 text-2xl font-bold mb-8 text-shadow-sm text-shadow-black">Lista de Vendas</h1>
      </div>
      <div className="flex flex-start">
        <Button onClick={() => (window.location.href = "/nova-venda")} className="h-12 mb-4 ml-2 border-black border-2">
          Nova Venda
        </Button>
      </div>
      <Carousel opts={{ loop: true }} setApi={setApi} className="w-120 border-1 bg-zinc-800/20 border-zinc-900 p-2 mb-4 rounded-xl hover:bg-zinc-900/20">
        <CarouselContent className=" basis-0 cursor-grab grow-0">
          {vendas.map((sale_list, index) => (
            <CarouselItem
              key={index}
              className="pb-4 justify-between block shadow-none border-black items-center">
              {sale_list.map((sale) => (
                <div  className="flex gap-4 items-center justify-between p-4 w-full mt-2 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-2xl border-black border-1">
                  <div>
                    <p>
                      <strong>Nome:</strong> {sale.nome}
                    </p>
                    <p>
                      <strong>Valor:</strong> R$ {sale.valor}
                    </p>
                  </div>
                  <div className="space-x-2 items-center flex h-full">
                    <Button
                      onClick={() => handleEdit(sale)}
                      className=" text-indigo-300 h-10 bg-0 border-2 border-indigo-300">
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(sale.id)}
                      className=" text-green-300 h-10 bg-0 border-2 border-green-300">
                      Deletar
                    </Button>
                  </div>
                </div>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="w-full flex justify-end gap-2">
        <Button onClick={() => api?.scrollTo(current - 1)} className="w-6 h-8 border-2 border-indigo-300">
          <ArrowLeft className="text-indigo-300" />
        </Button>
        <Button onClick={() => api?.scrollTo(current + 1)} className="w-6 h-8 border-2 border-green-300">
          <ArrowRight className="text-green-300"/>
        </Button>
      </div>
      
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
