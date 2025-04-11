import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateNewSale = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const navigate = useNavigate();
  const handleRegisterSale = () => {
    if (name === "" || price === "") { 
      toast.error("Preencha todos os campos.", {
        duration: 1000
      })
      return
    };
    toast(`Nova venda gerada: ${name}, valor: ${price}.`, {
      duration: 2000
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="w-[380px]">
      <Card className="bg-transparent p-2 backdrop-blur-xs py-10 border-1 border-zinc-900">
        <CardHeader>
          <CardTitle className="underline text-2xl text-indigo-300 mb-2 font-bold underline-offset-4">
            Cadastrar nova venda
          </CardTitle>
          <CardDescription className="text-neutral-100 text-sm font-mono">
            Preencha as informações de preço e nome para concluir cadastro da venda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-md text-neutral-200 pl-2">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Nome da venda"
                  className="bg-white/70 border-1 border-zinc-900"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-md text-neutral-200 pl-2">
                  Preço
                </Label>
                <NumericFormat
                  className="bg-white/70 border-1 border-zinc-900"
                  customInput={Input}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <Button
            className="text-green-300 md:w-auto w-full h-10 bg-0 border-2 border-green-300"
            onClick={handleRegisterSale}>
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateNewSale;
