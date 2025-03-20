"use client";
import "@/app/styles/globals.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha inválida"),
  ip: z.string(),
  userAgent: z.string(),
  csrfToken: z.string(),
});

type LoginUserFormData = z.infer<typeof formSchema>;

type LoginProps = Omit<LoginUserFormData, "email" | "password">;

export function Login({ csrfToken, ip, userAgent }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      csrfToken,
      userAgent,
      ip,
    },
  });

  const handleLogin = async (credentials: LoginUserFormData) => {
    await signIn("credentials", {
      ...credentials,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <input type="hidden" {...register("csrfToken")} />
            <input type="hidden" {...register("ip")} />
            <input type="hidden" {...register("userAgent")} />
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
