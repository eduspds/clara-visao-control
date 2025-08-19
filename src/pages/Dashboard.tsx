import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  BarChart3
} from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export default function Dashboard() {
  // Dados simulados para o dashboard
  const todayStats = {
    newChats: 12,
    activeChats: 3,
    completedChats: 9,
    avgResponseTime: "2min 30s"
  };

  const recentChats = [
    { id: 1, customer: "Maria Silva", status: "waiting", lastMessage: "Preciso de informações sobre o produto X", time: "14:30" },
    { id: 2, customer: "João Santos", status: "active", lastMessage: "Obrigado pelo atendimento!", time: "14:15" },
    { id: 3, customer: "Ana Costa", status: "completed", lastMessage: "Problema resolvido, muito obrigada!", time: "13:45" }
  ];

  const salesFunnel = [
    { stage: "Novos Contatos", count: 24, color: "bg-blue-500" },
    { stage: "Em Negociação", count: 8, color: "bg-yellow-500" },
    { stage: "Fechados", count: 5, color: "bg-green-500" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'active': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'Aguardando';
      case 'active': return 'Ativo';
      case 'completed': return 'Concluído';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header com Hero */}
      <div className="relative rounded-xl overflow-hidden">
        <img 
          src={heroImage} 
          alt="Dashboard Overview" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <h1 className="text-3xl font-bold mb-2">
              Bem-vindo ao seu Painel de Controle! 👋
            </h1>
            <p className="text-lg opacity-90">
              Aqui está um resumo do que está acontecendo hoje na sua empresa.
            </p>
          </div>
        </div>
      </div>

      {/* Métricas do Dia */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Chats Hoje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayStats.newChats}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chats Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayStats.activeChats}</div>
            <p className="text-xs text-muted-foreground">
              Precisam de atenção agora
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atendimentos Completos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{todayStats.completedChats}</div>
            <p className="text-xs text-muted-foreground">
              Clientes satisfeitos hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayStats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              Tempo de resposta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chats Recentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Últimos Atendimentos
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver Todos
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <div key={chat.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(chat.status)}
                    <div>
                      <p className="font-medium">{chat.customer}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={chat.status === 'completed' ? 'default' : 'secondary'}>
                      {getStatusText(chat.status)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{chat.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Funil de Vendas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Funil de Vendas
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver Detalhes
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesFunnel.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-2xl font-bold">{stage.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${stage.color}`}
                      style={{ width: `${(stage.count / 24) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-success-light rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-success" />
                  <span className="font-medium text-success">Taxa de Conversão</span>
                </div>
                <div className="text-2xl font-bold text-success">20.8%</div>
                <p className="text-sm text-success/80">5 vendas de 24 contatos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline">
              <MessageSquare className="h-6 w-6" />
              <span>Ver Todos os Chats</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline">
              <TrendingUp className="h-6 w-6" />
              <span>Gerenciar Funil</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col gap-2" variant="outline">
              <BarChart3 className="h-6 w-6" />
              <span>Relatórios</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}