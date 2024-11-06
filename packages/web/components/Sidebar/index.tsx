"use client";
import Link from "next/link";
import {
  Calendar,
  Dog,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function Sidebar() {
  return (
    <div className="w-64 flex-shrink-0 bg-neutral-800 text-white dark:bg-gray-900 dark:text-gray-100">
      <div className="flex h-16 items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <Dog className="h-6 w-6" />
          <span>PetShop Manager</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-white transition-all hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-800"
          href="/dashboard"
        >
          <Home className="h-4 w-4" />
          Início
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-white transition-all hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          href="/dashboard/caixa"
        >
          <ShoppingCart className="h-4 w-4" />
          Caixa
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-white transition-all hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          href="/dashboard/agenda"
        >
          <Calendar className="h-4 w-4" />
          Agendamentos
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-white transition-all hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          href="/dashboard/caixa"
        >
          <Users className="h-4 w-4" />
          Clientes
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-white transition-all hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          href="#"
        >
          <Package className="h-4 w-4" />
          Produtos
        </Link>

        <div className="border-t mt-2">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 mt-2 text-white transition-all hover:bg-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            href="/dashboard/configuracoes"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-lg px-4 mt-2 text-sm font-medium text-white transition-colors hover:bg-red-500 dark:text-gray-400 dark:hover:bg-gray-800"
            onClick={() => signOut()}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </nav>
    </div>
  );
}
