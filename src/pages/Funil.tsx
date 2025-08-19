import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  TrendingUp, 
  Plus, 
  User, 
  Phone, 
  Calendar,
  DollarSign
} from "lucide-react";

export default function Funil() {
  const stages = [
    { 
      name: "Novos Contatos", 
      color: "bg-blue-500", 
      count: 8,
      leads: [
        { id: 1, name: "Maria Silva", phone: "(11) 9999-9999", value: "R$ 2.500", avatar: "MS" },
        { id: 2, name: "João Santos", phone: "(11) 8888-8888", value: "R$ 1.800", avatar: "JS" },
        { id: 3, name: "Ana Costa", phone: "(11) 7777-7777", value: "R$ 3.200", avatar: "AC" }
      ]
    },
    { 
      name: "Em Negociação", 
      color: "bg-yellow-500", 
      count: 5,
      leads: [
        { id: 4, name: "Pedro Lima", phone: "(11) 6666-6666", value: "R$ 4.500", avatar: "PL" },
        { id: 5, name: "Carla Mendes", phone: "(11) 5555-5555", value: "R$ 2.800", avatar: "CM" }
      ]
    },
    { 
      name: "Proposta Enviada", 
      color: "bg-orange-500", 
      count: 3,
      leads: [
        { id: 6, name: "Ricardo Alves", phone: "(11) 4444-4444", value: "R$ 5.200", avatar: "RA" }
      ]
    },
    { 
      name: "Fechados", 
      color: "bg-green-500", 
      count: 2,
      leads: [
        { id: 7, name: "Lucia Ferreira", phone: "(11) 3333-3333", value: "R$ 3.800", avatar: "LF" }
      ]
    }
  ];

  const totalValue = stages.reduce((acc, stage) => 
    acc + stage.leads.reduce((stageAcc, lead) => 
      stageAcc + parseFloat(lead.value.replace('R$ ', '').replace('.', '').replace(',', '.')), 0), 0
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Funil de Vendas
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus prospects e acompanhe o progresso das vendas
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">18</div>
            <p className="text-xs text-muted-foreground">+3 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Negociação</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">5</div>
            <p className="text-xs text-muted-foreground">Precisam de atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">28%</div>
            <p className="text-xs text-muted-foreground">Acima da média</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground">No pipeline</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {stages.map((stage, stageIndex) => (
          <Card key={stageIndex} className="h-fit">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  {stage.name}
                </CardTitle>
                <Badge variant="secondary">{stage.count}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.leads.map((lead) => (
                <Card key={lead.id} className="p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`} />
                      <AvatarFallback className="text-xs">{lead.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-success">{lead.value}</span>
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full h-8 text-xs border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/50"
              >
                + Adicionar lead
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Plus className="h-5 w-5" />
              <span>Importar Leads</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>Relatório de Vendas</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Phone className="h-5 w-5" />
              <span>Agendar Follow-up</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}