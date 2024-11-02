import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schedulingFormSchema = z.object({
  client: z.string().min(1, "Cliente é obrigatório"),
  pet: z.string().min(1, "Nome do Pet é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  price: z.number().min(0.01, "Valor deve ser maior que zero"),
  service: z.enum(["Banho", "Tosa", "Consulta Veterinária", "Vacinação"], {
    required_error: "Serviço é obrigatório",
  }),
  data: z.date().optional(),
});

type SchedulingFormData = z.infer<typeof schedulingFormSchema>;

export interface SchedulingProps {
  onClose: (isOpen: boolean) => void;
}

export function Scheduling({ onClose }: SchedulingProps) {
  const {
    register,
    handleSubmit,
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

    onClose(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Agendar Serviço</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
