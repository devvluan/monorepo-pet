// app/caixa/page.tsx
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";
import SuccessAlert from "@/components/SuccessAlert";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const createUserFormSchema = z.object({
  client: z.string().min(1, "Cliente é obrigatório"),
  product: z.string().min(1, "Produto é obrigatório"),
  amount: z.number({
    invalid_type_error: "Insira a quantidade do produto",
  }),
  price: z.preprocess(
    (input) => {
      if (typeof input === "string") {
        return parseFloat(input.replace(",", "."));
      }
      return input;
    },
    z.number({ invalid_type_error: "Insira o valor do produto" })
  ),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

type Venda = CreateUserFormData & { data: string; created_at: DateTime };
export default function Caixa() {
  const [historicoVendas, setHistoricoVendas] = useState<Venda[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  useEffect(() => {
    async function fetchHistoricoVendas() {
      const response = await fetch(
        "http://localhost:3333/dashboard/historico/vendas",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const historicoVendas = await response.json();
      setHistoricoVendas(historicoVendas);
    }
    fetchHistoricoVendas();
  }, []);

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    try {
      const response = await fetch("http://localhost:3333/dashboard/vendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlertOpen(true);
      }
      const novaVenda: Venda = {
        ...data,
        created_at: DateTime.utc(),
        data: "",
      };
      setHistoricoVendas((prevVendas) => [...prevVendas, novaVenda]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="ml-[4.8rem]">
      <CardHeader>
        <Header title="Registro de Vendas" />
      </CardHeader>
      <CardContent>
        <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
          <SuccessAlert
            show={alertOpen}
            message="Venda registrada com sucesso"
            onClose={() => setAlertOpen(false)}
          />

          <div>
            <label htmlFor="cliente" className="block font-medium mb-1">
              Cliente
            </label>
            <Input
              type="text"
              id="cliente"
              className="border border-gray-300"
              placeholder="Nome do cliente"
              {...register("client")}
            />
            {errors.client && (
              <p className="text-red-500">{errors.client.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="produto" className="block font-medium mt-3 mb-1">
              Produto
            </label>
            <Input
              type="text"
              id="produto"
              className="border border-gray-300"
              placeholder="Nome do produto"
              {...register("product")}
            />
            {errors.product && (
              <p className="text-red-500">{errors.product.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="quantidade" className="block font-medium mt-3 mb-1">
              Quantidade
            </label>
            <Input
              type="number"
              id="quantidade"
              className="border border-gray-300"
              placeholder="Quantidade"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="valor" className="block font-medium mt-3 mb-1">
              Valor
            </label>
            <Input
              type="number"
              id="valor"
              className="border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Valor"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <Button type="submit" className="mt-4 w-60">
            <Plus className="mr-2 h-4 w-4" /> Registrar Venda
          </Button>
        </form>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicoVendas.toReversed().map((venda, index) => (
              <TableRow key={index}>
                <TableCell>{venda.client}</TableCell>
                <TableCell>{venda.product}</TableCell>
                <TableCell>{venda.amount}</TableCell>
                <TableCell>
                  {" "}
                  R$
                  {venda.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(venda.created_at.toString(), {
                    zone: "utc",
                  })
                    .setLocale("pt-BR")
                    .toFormat("dd/MM/yyyy HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
