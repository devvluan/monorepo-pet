"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const createUserFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha inválida"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro desconhecido");
      }

      const result = await response.json();

      if (result.jwt) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/dashboard",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Digite seu email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Digite sua senha"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-500 text-white font-semibold rounded-md py-2 hover:bg-emerald-600 transition-colors"
            >
              Entrar
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
