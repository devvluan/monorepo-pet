import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import SuccessAlert from "@/components/SuccessAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const schedulingFormSchema = z.object({
  client: z.string().min(1, "Cliente é obrigatório"),
  pet: z.string().min(1, "Nome do Pet é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  price: z.number().min(0.01, "Valor deve ser maior que zero"),
  service: z.enum(["Banho", "Tosa", "Consulta Veterinária", "Vacinação"], {
    required_error: "Serviço é obrigatório",
  }),
  date: z.date(),
});

type SchedulingFormData = z.infer<typeof schedulingFormSchema>;

export interface SchedulingProps {
  onClose: (isOpen: boolean) => void;
}

export function Scheduling({ onClose }: SchedulingProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [date, setDate] = React.useState<Date>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm<SchedulingFormData>({
    resolver: zodResolver(schedulingFormSchema),
    defaultValues: {
      client: "",
      pet: "",
      price: 0,
      service: "Banho",
    },
  });

  const onSubmit: SubmitHandler<SchedulingFormData> = async (data) => {
    console.log(data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/scheduling`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (response.ok) {
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Agendar Serviço</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SuccessAlert
            show={showAlert}
            message="Agendamento registrada com sucesso"
          />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client" className="text-right">
                Nome do Cliente
              </Label>
              <Input
                id="client"
                className="col-span-3"
                placeholder="Nome do Cliente"
                {...register("client")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet" className="text-right">
                Nome do Pet
              </Label>
              <Input
                id="pet"
                className="col-span-3"
                placeholder="Nome do Pet"
                {...register("pet")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                placeholder="Telefone"
                {...register("phone")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Valor
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                className="col-span-3"
                placeholder="Preço"
                {...register("price", { valueAsNumber: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service" className="text-right">
                Serviço
              </Label>
              <select
                className="col-span-3 p-2 border rounded"
                id="service"
                {...register("service")}
              >
                <option value="Banho">Banho</option>
                <option value="Tosa">Tosa</option>
                <option value="Consulta Veterinária">
                  Consulta Veterinária
                </option>
                <option value="Vacinação">Vacinação</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="data" className="text-right">
                Data
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                    {...register("date")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "dd/MM/yyyy")
                    ) : (
                      <span>Escolha a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date);
                      setValue("date", date!);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button type="submit" className="w-full hover:bg-green-700">
            Agendar
          </Button>
          <Button
            className="w-full bg-red-600 hover:bg-red-700 mt-2"
            onClick={() => onClose(false)}
          >
            Cancelar
          </Button>
        </form>
      </div>
    </>
  );
}
