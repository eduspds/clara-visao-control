import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, ArrowLeft, Smartphone, MessageSquare, Clock, CheckCircle } from "lucide-react";

interface WizardProps {
  onComplete: () => void;
}

export function WelcomeWizard({ onComplete }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [config, setConfig] = useState({
    welcomeMessage: "Olá! Bem-vindo à [Nome da Empresa]. Para agilizar, diga seu nome e o assunto, por favor.",
    enableAwayMessage: true,
    workingHours: "Segunda a Sexta, das 09:00 às 18:00",
    awayMessage: "Nosso horário de atendimento é de Segunda a Sexta, das 09:00 às 18:00. Recebemos sua mensagem e responderemos assim que possível!",
    closingMessage: "Seu atendimento foi concluído! A [Nome da Empresa] agradece seu contato. Se precisar de algo mais, é só chamar!"
  });

  const steps = [
    {
      title: "Bem-vindo à sua nova Central de Controle!",
      subtitle: "Vamos deixar tudo pronto para você em 3 passos rápidos.",
      component: <WelcomeStep />
    },
    {
      title: "Conecte seu número de atendimento",
      subtitle: "Use o aplicativo do WhatsApp no seu celular para escanear o código abaixo.",
      component: <WhatsAppStep isConnecting={isConnecting} isConnected={isConnected} onConnect={handleConnect} />
    },
    {
      title: "Deixe seu robô pronto para trabalhar",
      subtitle: "Seus clientes verão essas mensagens automaticamente. Preencha como preferir.",
      component: <MessagesStep config={config} setConfig={setConfig} />
    },
    {
      title: "Tudo pronto! ✨",
      subtitle: "Perfeito! Sua plataforma de atendimento está configurada e pronta para usar.",
      component: <CompletionStep />
    }
  ];

  function handleConnect() {
    setIsConnecting(true);
    // Simular conexão
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  }

  function nextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">VC</span>
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">{currentStepData.title}</CardTitle>
          <p className="text-muted-foreground text-lg">{currentStepData.subtitle}</p>
          
          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          {currentStepData.component}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={currentStep === 1 && !isConnected}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Acessar meu Painel de Controle
                  <CheckCircle className="h-4 w-4" />
                </>
              ) : (
                <>
                  {currentStep === 0 ? 'Vamos Começar!' : 'Próximo'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="text-center py-8">
      <div className="w-32 h-32 mx-auto mb-6 bg-success-light rounded-full flex items-center justify-center">
        <CheckCircle2 className="h-16 w-16 text-success" />
      </div>
      <p className="text-lg text-muted-foreground">
        Você está a poucos passos de ter seu sistema de atendimento funcionando perfeitamente.
      </p>
    </div>
  );
}

function WhatsAppStep({ isConnecting, isConnected, onConnect }: {
  isConnecting: boolean;
  isConnected: boolean;
  onConnect: () => void;
}) {
  return (
    <div className="text-center py-4">
      {!isConnected ? (
        <>
          <div className="w-48 h-48 mx-auto mb-6 bg-muted rounded-xl flex items-center justify-center">
            {isConnecting ? (
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            ) : (
              <div className="text-6xl">📱</div>
            )}
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
              <span>Abra o WhatsApp no seu celular</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
              <span>Vá em "Aparelhos Conectados"</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
              <span>Clique em "Conectar um aparelho"</span>
            </div>
          </div>
          
          {!isConnecting && (
            <Button onClick={onConnect} size="lg" className="w-full">
              <Smartphone className="h-5 w-5 mr-2" />
              Simular Conexão com WhatsApp
            </Button>
          )}
          
          {isConnecting && (
            <p className="text-primary font-medium">Verificando conexão...</p>
          )}
        </>
      ) : (
        <div className="py-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-success-light rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-16 w-16 text-success" />
          </div>
          <h3 className="text-2xl font-semibold text-success mb-2">Conectado com sucesso! ✅</h3>
          <p className="text-muted-foreground">Seu WhatsApp está pronto para receber mensagens.</p>
        </div>
      )}
    </div>
  );
}

function MessagesStep({ config, setConfig }: {
  config: any;
  setConfig: (config: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Quando um cliente chama pela primeira vez:
        </Label>
        <Textarea
          value={config.welcomeMessage}
          onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
          placeholder="Digite sua mensagem de boas-vindas..."
          className="min-h-[80px]"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch
            checked={config.enableAwayMessage}
            onCheckedChange={(checked) => setConfig({ ...config, enableAwayMessage: checked })}
          />
          <Label className="text-base font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Ativar mensagem de ausência?
          </Label>
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
              <Label className="text-sm text-muted-foreground">Mensagem de ausência:</Label>
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
        <Label className="text-base font-medium flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Quando um atendimento é finalizado:
        </Label>
        <Textarea
          value={config.closingMessage}
          onChange={(e) => setConfig({ ...config, closingMessage: e.target.value })}
          placeholder="Digite sua mensagem de encerramento..."
          className="min-h-[80px]"
        />
      </div>
    </div>
  );
}

function CompletionStep() {
  return (
    <div className="text-center py-8">
      <div className="w-32 h-32 mx-auto mb-6 bg-success-light rounded-full flex items-center justify-center">
        <CheckCircle2 className="h-16 w-16 text-success" />
      </div>
      <p className="text-lg text-muted-foreground mb-4">
        Você pode sempre ajustar essas e outras opções no menu de Configurações.
      </p>
      <div className="bg-muted rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Dica:</strong> Explore seu painel para descobrir todas as funcionalidades disponíveis!
        </p>
      </div>
    </div>
  );
}