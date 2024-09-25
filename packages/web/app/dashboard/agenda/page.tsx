// app/home/page.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  List,
  Grid,
  Plus,
  Search,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";

export default function Agenda() {
  const [selected, setSelected] = useState<Date>();
  return (
    <div className="ml-[4.8rem] flex-1 p-4 h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold ">Agenda de Pets</h1>
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

      {/* Main Content */}
      <main className="bg-white rounded-lg shadow-md p-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button className="flex items-center space-x-2 font-medium hover:bg-gray-700">
            <Calendar className="w-5 h-5" />
            <span>Calendário</span>
          </Button>
          <Button className="flex items-center space-x-2 hover:bg-gray-700">
            <List className="w-5 h-5" />
            <span>Lista de Agendamentos</span>
          </Button>
          <Button className="flex items-center space-x-2 hover:bg-gray-700">
            <Grid className="w-5 h-5" />
            <span>Visão Geral</span>
          </Button>
        </div>

        {/* Calendar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Calendário de Agendamentos
            </h2>
            <Button className="bg-primary text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gray-700">
              <Plus className="w-5 h-5" />
              <span>Novo Agendamento</span>
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                className="aspect-video border rounded-lg flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Próximos Agendamentos</h3>
          <ul className="space-y-2">
            {[
              { pet: "Max", service: "Banho", date: "10 Jun, 14:00" },
              { pet: "Luna", service: "Tosa", date: "11 Jun, 10:30" },
              { pet: "Rex", service: "Consulta", date: "12 Jun, 16:15" },
            ].map((appointment, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{appointment.pet}</p>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                </div>
                <p className="text-sm text-gray-600">{appointment.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
