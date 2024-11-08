// app/home/page.tsx
"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar, Grid, List, Plus } from "lucide-react";
import { Scheduling } from "@/components/Modal/Scheduling";
import { useState } from "react";

export default function Agenda() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      {/* Header */}
      <Header title="Agenda" />
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
            <Button
              className="bg-primary text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gray-700"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-5 h-5" />
              <span>Novo Agendamento</span>
            </Button>
            {showModal && (
              <>
                <Scheduling onClose={() => setShowModal(false)} />
              </>
            )}
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
