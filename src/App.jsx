import { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Input } from "@/components/ui/input"; import { Button } from "@/components/ui/button"; import { motion } from "framer-motion";

export default function FinanceApp() { const [salary, setSalary] = useState(0); const [goal, setGoal] = useState(0); const [expenses, setExpenses] = useState({ aluguel: 0, agua: 0, luz: 0, internet: 0, lazer: 0, saude: 0, comida: 0, });

const totalExpenses = Object.values(expenses).reduce((a, b) => a + Number(b), 0); const remaining = salary - totalExpenses;

const months = goal > 0 && remaining > 0 ? (goal / remaining).toFixed(1) : 0;

const getColor = () => { if (remaining > salary * 0.3) return "text-green-400"; if (remaining > 0) return "text-yellow-400"; return "text-red-500"; };

return ( <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6"> <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6 text-center" > 💸 Planejamento Financeiro </motion.h1>

<div className="grid md:grid-cols-2 gap-6">
    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">Receita e Meta</h2>
        <Input
          placeholder="Salário mensal"
          type="number"
          onChange={(e) => setSalary(e.target.value)}
        />
        <Input
          placeholder="Meta (R$)"
          type="number"
          onChange={(e) => setGoal(e.target.value)}
        />
      </CardContent>
    </Card>

    <Card className="bg-gray-900 border-gray-700">
      <CardContent className="p-4 space-y-3">
        <h2 className="text-xl font-semibold">Despesas</h2>
        {Object.keys(expenses).map((key) => (
          <Input
            key={key}
            placeholder={key}
            type="number"
            onChange={(e) =>
              setExpenses({ ...expenses, [key]: e.target.value })
            }
          />
        ))}
      </CardContent>
    </Card>
  </div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <Card className="bg-gray-900 border-gray-700 mt-6">
      <CardContent className="p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold">Resumo</h2>
        <p>Total de despesas: R$ {totalExpenses}</p>
        <p className={getColor()}>
          Sobra mensal: R$ {remaining}
        </p>
        <p>Tempo para atingir meta: {months} meses</p>

        <Button className="mt-4 bg-green-500 hover:bg-green-600">
          Simular novamente
        </Button>
      </CardContent>
    </Card>
  </motion.div>
</div>

); }
