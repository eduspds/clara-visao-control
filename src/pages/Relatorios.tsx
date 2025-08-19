import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  MessageSquare,
  Clock,
  Users,
  DollarSign
} from "lucide-react";

export default function Relatorios() {
  const monthlyData = [
    { month: "Jan", chats: 45, sales: 12, revenue: 18500 },
    { month: "Fev", chats: 52, sales: 15, revenue: 22300 },
    { month: "Mar", chats: 38, sales: 9, revenue: 14200 },
    { month: "Abr", chats: 65, sales: 18, revenue: 28900 },
    { month: "Mai", chats: 71, sales: 21, revenue: 32100 },
    { month: "Jun", chats: 58, sales: 16, revenue: 25400 }
  ];

  const currentMonth = monthlyData[5]; // Junho (último mês)
  const previousMonth = monthlyData[4]; // Maio

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(growth).toFixed(1),
      isPositive: growth > 0
    };
  };

  const chatGrowth = calculateGrowth(currentMonth.chats, previousMonth.chats);
  const salesGrowth = calculateGrowth(currentMonth.sales, previousMonth.sales);
  const revenueGrowth = calculateGrowth(currentMonth.revenue, previousMonth.revenue);

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
            <BarChart3 className="h-8 w-8 text-primary" />
            Relatórios
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe o desempenho do seu negócio com dados claros e simples
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Filtrar Período
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atendimentos (Junho)</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{currentMonth.chats}</div>
            <div className="flex items-center gap-1 text-xs">
              {chatGrowth.isPositive ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={chatGrowth.isPositive ? "text-success" : "text-destructive"}>
                {chatGrowth.value}% vs. mês anterior
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Fechadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{currentMonth.sales}</div>
            <div className="flex items-center gap-1 text-xs">
              {salesGrowth.isPositive ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={salesGrowth.isPositive ? "text-success" : "text-destructive"}>
                {salesGrowth.value}% vs. mês anterior
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {formatCurrency(currentMonth.revenue)}
            </div>
            <div className="flex items-center gap-1 text-xs">
              {revenueGrowth.isPositive ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={revenueGrowth.isPositive ? "text-success" : "text-destructive"}>
                {revenueGrowth.value}% vs. mês anterior
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {((currentMonth.sales / currentMonth.chats) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {currentMonth.sales} vendas de {currentMonth.chats} atendimentos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Atendimentos por Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Atendimentos nos Últimos 6 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{data.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.chats / 75) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary w-8 text-right">
                    {data.chats}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendas por Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Vendas nos Últimos 6 Meses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{data.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.sales / 25) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-success w-8 text-right">
                    {data.sales}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-success-light">
              <div className="text-2xl font-bold text-success mb-1">
                {monthlyData.reduce((acc, curr) => acc + curr.sales, 0)}
              </div>
              <p className="text-sm text-success font-medium">Total de Vendas (6 meses)</p>
              <p className="text-xs text-success/80 mt-1">Média de {(monthlyData.reduce((acc, curr) => acc + curr.sales, 0) / 6).toFixed(1)} por mês</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <div className="text-2xl font-bold text-primary mb-1">
                {monthlyData.reduce((acc, curr) => acc + curr.chats, 0)}
              </div>
              <p className="text-sm text-primary font-medium">Total de Atendimentos</p>
              <p className="text-xs text-primary/80 mt-1">Média de {(monthlyData.reduce((acc, curr) => acc + curr.chats, 0) / 6).toFixed(1)} por mês</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-warning-light">
              <div className="text-2xl font-bold text-warning mb-1">
                {formatCurrency(monthlyData.reduce((acc, curr) => acc + curr.revenue, 0))}
              </div>
              <p className="text-sm text-warning font-medium">Faturamento Total</p>
              <p className="text-xs text-warning/80 mt-1">
                Média de {formatCurrency(monthlyData.reduce((acc, curr) => acc + curr.revenue, 0) / 6)} por mês
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}