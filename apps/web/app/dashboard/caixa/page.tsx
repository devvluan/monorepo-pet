// app/caixa/page.tsx
"use client";
import Header from "@/components/Header";
import SuccessAlert from "@/components/SuccessAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { CreditCard, Receipt, Wallet } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const createUserFormSchema = z.object({
  client: z.string().min(1, "Cliente é obrigatório"),
  product: z.string().min(1, "Produto é obrigatório"),
  quantity: z.number().min(1, "Quantidade é obrigatório"),
  price: z.number().min(0.01, "Valor deve ser maior que zero"),
  form_payment: z.enum(["Cartão", "Dinheiro", "Pix"], {
    required_error: "Forma de pagamento é obrigatório",
  }),
  data: z.date().optional(),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function Caixa() {
  const [sales, setSales] = useState<CreateUserFormData[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      client: "",
      product: "",
      quantity: 0,
      price: 0,
      form_payment: "Cartão",
    },
  });

  useEffect(() => {
    async function fetchHistoricoVendas() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/historico/vendas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const historicoVendas = await response.json();
      setSales(historicoVendas);
    }
    fetchHistoricoVendas();
  }, []);

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/vendas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setAlertOpen(true);
      }

      setSales([...sales, { ...data, data: DateTime.now().toJSDate() }]);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title="Registro de Vendas" />

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 mb-6">
        <SuccessAlert
          show={alertOpen}
          message="Venda registrada com sucesso"
          onClose={() => setAlertOpen(false)}
        />
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Input
            id="client"
            {...register("client")}
            placeholder="Nome do cliente"
          />
          {errors.client && (
            <p className="text-red-500 text-sm mt-1">{errors.client.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="produto">Produto</Label>
          <Input
            id="product"
            {...register("product")}
            placeholder="Nome do produto"
          />
          {errors.product && (
            <p className="text-red-500 text-sm mt-1">
              {errors.product.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="quantidade">Quantidade</Label>
          <Input
            id="quantity"
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            placeholder="Quantidade"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="valor">Valor</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            placeholder="Valor"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label>Forma de Pagamento</Label>
          <RadioGroup
            defaultValue="card"
            className="grid grid-cols-3 gap-4 mt-2"
            value={watch("form_payment")}
            onValueChange={(value) =>
              setValue("form_payment", value as "Cartão" | "Dinheiro" | "Pix")
            }
          >
            <div>
              <RadioGroupItem
                value="Cartão"
                id="card"
                className="peer sr-only"
              />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <CreditCard className="mb-3 h-6 w-6" />
                Cartão
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="Dinheiro"
                id="money"
                className="peer sr-only"
              />
              <Label
                htmlFor="money"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Wallet className="mb-3 h-6 w-6" />
                Dinheiro
              </Label>
            </div>
            <div>
              <RadioGroupItem value="Pix" id="pix" className="peer sr-only" />
              <Label
                htmlFor="pix"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Receipt className="mb-3 h-6 w-6" />
                Pix
              </Label>
            </div>
          </RadioGroup>
          <input type="hidden" {...register("form_payment")} />
          {errors.form_payment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.form_payment.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          <span className="mr-2">+</span> Registrar Venda
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sales, index) => (
            <TableRow key={index}>
              <TableCell>{sales.client}</TableCell>
              <TableCell>{sales.product}</TableCell>
              <TableCell>{sales.quantity}</TableCell>
              <TableCell>R${sales.price}</TableCell>
              <TableCell>{sales.form_payment}</TableCell>
              <TableCell>
                {sales.data
                  ? DateTime.fromJSDate(sales.data).toFormat("dd/MM/yyyy")
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
