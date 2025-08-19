import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  Save,
  Play,
  Pause,
  Settings
} from "lucide-react";
import { toast } from "sonner";

export default function Robo() {
  const [isActive, setIsActive] = useState(true);
  const [config, setConfig] = useState({
    welcomeMessage: "Olá! Bem-vindo à [Nome da Empresa]. Para agilizar, diga seu nome e o assunto, por favor.",
    enableAwayMessage: true,
    workingHours: "Segunda a Sexta, das 09:00 às 18:00",
    awayMessage: "Nosso horário de atendimento é de Segunda a Sexta, das 09:00 às 18:00. Recebemos sua mensagem e responderemos assim que possível!",
    closingMessage: "Seu atendimento foi concluído! A [Nome da Empresa] agradece seu contato. Se precisar de algo mais, é só chamar!",
    autoResponses: [
      { keyword: "preço", response: "Nossos preços começam a partir de R$ 99. Gostaria de saber mais detalhes?" },
      { keyword: "horário", response: "Funcionamos de segunda a sexta, das 9h às 18h. Sábados das 9h às 13h." },
      { keyword: "endereço", response: "Estamos localizados na Rua das Flores, 123, Centro. Quer que eu envie a localização?" }
    ]
  });

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  const toggleBot = () => {
    setIsActive(!isActive);
    toast.success(isActive ? "Robô pausado" : "Robô ativado");
  };

  const stats = {
    messagesProcessed: 1247,
    autoResponses: 89,
    humanHandoffs: 34,
    responseTime: "0.5s"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            Configuração do Robô
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure as mensagens automáticas e o comportamento do seu assistente virtual
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isActive ? "default" : "secondary"} className="px-3 py-1">
            {isActive ? "Ativo" : "Pausado"}
          </Badge>
          <Button
            onClick={toggleBot}
            variant={isActive ? "outline" : "default"}
            className="flex items-center gap-2"
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isActive ? "Pausar Robô" : "Ativar Robô"}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Processadas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.messagesProcessed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respostas Automáticas</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.autoResponses}</div>
            <p className="text-xs text-muted-foreground">Sem intervenção humana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferências</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.humanHandoffs}</div>
            <p className="text-xs text-muted-foreground">Para atendimento humano</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.responseTime}</div>
            <p className="text-xs text-muted-foreground">Resposta média</p>
          </CardContent>
        </Card>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mensagens Principais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Mensagens Principais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base font-medium">Mensagem de Boas-vindas</Label>
              <Textarea
                value={config.welcomeMessage}
                onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                placeholder="Digite sua mensagem de boas-vindas..."
                className="min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                Enviada automaticamente quando um novo cliente inicia uma conversa
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={config.enableAwayMessage}
                  onCheckedChange={(checked) => setConfig({ ...config, enableAwayMessage: checked })}
                />
                <Label className="text-base font-medium">Mensagem de Ausência</Label>
              </div>
              
              {config.enableAwayMessage && (
                <div className="space-y-3 pl-6">
                  <div>
                    <Label className="text-sm text-muted-foreground">Horário de funcionamento:</Label>
                    <Input
                      value={config.workingHours}
                      onChange={(e) => setConfig({ ...config, workingHours: e.target.value })}
                      placeholder="Ex: Segunda a Sexta, das 09:00 às 18:00"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Mensagem:</Label>
                    <Textarea
                      value={config.awayMessage}
                      onChange={(e) => setConfig({ ...config, awayMessage: e.target.value })}
                      className="min-h-[60px]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Mensagem de Encerramento</Label>
              <Textarea
                value={config.closingMessage}
                onChange={(e) => setConfig({ ...config, closingMessage: e.target.value })}
                placeholder="Digite sua mensagem de encerramento..."
                className="min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                Enviada quando um atendimento é finalizado
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Respostas Automáticas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Respostas Automáticas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure palavras-chave e respostas automáticas correspondentes
            </p>
            
            <div className="space-y-4">
              {config.autoResponses.map((item, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Palavra-chave</Label>
                    <Input
                      value={item.keyword}
                      onChange={(e) => {
                        const newResponses = [...config.autoResponses];
                        newResponses[index].keyword = e.target.value;
                        setConfig({ ...config, autoResponses: newResponses });
                      }}
                      placeholder="Ex: preço, horário..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Resposta</Label>
                    <Textarea
                      value={item.response}
                      onChange={(e) => {
                        const newResponses = [...config.autoResponses];
                        newResponses[index].response = e.target.value;
                        setConfig({ ...config, autoResponses: newResponses });
                      }}
                      placeholder="Digite a resposta automática..."
                      className="min-h-[60px]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setConfig({
                  ...config,
                  autoResponses: [...config.autoResponses, { keyword: "", response: "" }]
                });
              }}
            >
              + Adicionar Nova Resposta
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}