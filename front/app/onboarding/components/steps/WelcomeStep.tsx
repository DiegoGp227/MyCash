"use client";

import { Wallet } from "lucide-react";

interface WelcomeStepProps {
  userName: string;
  onNext: () => void;
}

export default function WelcomeStep({ userName, onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-purple/10 border-2 border-primary-purple">
        <Wallet size={40} className="text-primary-purple" />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-hard-gray">
          ¡Bienvenido, {userName}!
        </h1>
        <p className="text-gray-400 max-w-sm leading-relaxed">
          MyCash te ayuda a llevar el control de tus finanzas personales.
          En los próximos pasos configuraremos tu espacio en menos de un minuto.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs text-left">
        {[
          { emoji: "💳", label: "Registra tus cuentas y saldos" },
          { emoji: "📂", label: "Organiza gastos por categorías" },
          { emoji: "📊", label: "Visualiza tu flujo de dinero" },
        ].map(({ emoji, label }) => (
          <div key={label} className="flex items-center gap-3 text-gray-300">
            <span className="text-xl">{emoji}</span>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full max-w-xs py-3 rounded bg-primary-purple text-white font-semibold hover:bg-primary-purple-hover transition-colors"
      >
        Empezar configuración
      </button>
    </div>
  );
}
