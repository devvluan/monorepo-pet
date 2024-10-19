// app/caixa/page.tsx
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Search, User } from "lucide-react";
import { DateTime } from "luxon";

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
        alert("Venda registrada com sucesso");
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
    <main className="flex-1 p-4">
      <div className="ml-[4.8rem] bg-white rounded-lg shadow-md p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold ">Registro de Vendas</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
              <Bell className="w-6 h-6" />
            </Button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Button className="p-2 rounded-full hover:bg-gray-700">
                <User className="w-6 h-6 text-white" />
              </Button>
              <span className="font-medium">John Doe</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="cliente" className="block font-medium mb-1">
              Cliente
            </label>
            <input
              type="text"
              id="cliente"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Nome do cliente"
              {...register("client")}
            />
            {errors.client && (
              <p className="text-red-500">{errors.client.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="produto" className="block font-medium mb-1">
              Produto
            </label>
            <input
              type="text"
              id="produto"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nome do produto"
              {...register("product")}
            />
            {errors.product && (
              <p className="text-red-500">{errors.product.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="quantidade" className="block font-medium mb-1">
              Quantidade
            </label>
            <input
              type="number"
              id="quantidade"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Quantidade"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="valor" className="block font-medium mb-1">
              Valor
            </label>
            <input
              type="number"
              id="valor"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Valor"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-emerald-500 rounded font-semibold - text-white h-10 p-2 hover:bg-emerald-600"
          >
            Registrar Venda
          </Button>
        </form>
      </div>
      <div className="ml-[4.8rem] bg-white roudend-lg shadow-md p-6 mt-6">
        <h2 className="text-2x1 font-bold mb-4">Histórico de Vendas</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Produto</th>
              <th className="px-4 py-2 text-left">Quantidade</th>
              <th className="px-4 py-2 text-left">Valor</th>
              <th className="px-4 py-2 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {historicoVendas.toReversed().map((venda, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-left">{venda.client}</td>
                <td className="px-4 py-2 text-left">{venda.product}</td>
                <td className="px-4 py-2 text-left">{venda.amount}</td>
                <td className="px-4 py-2 text-left">
                  {" "}
                  R$
                  {venda.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-2">
                  {DateTime.fromISO(venda.created_at.toString(), {
                    zone: "utc",
                  })
                    .setLocale("pt-BR")
                    .toFormat("dd/MM/yyyy HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
