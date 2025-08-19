import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Building,
  Bell,
  Shield,
  Palette,
  Download,
  Upload,
  Save,
  Smartphone,
  Mail,
  Globe,
  Clock
} from "lucide-react";
import { toast } from "sonner";

export default function Configuracoes() {
  const [companyConfig, setCompanyConfig] = useState({
    name: "Minha Empresa",
    phone: "(11) 9999-9999",
    email: "contato@minhaempresa.com",
    website: "www.minhaempresa.com",
    address: "Rua das Flores, 123, Centro"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    soundAlerts: true,
    desktopNotifications: false
  });

  const [workingHours, setWorkingHours] = useState({
    monday: { start: "09:00", end: "18:00", enabled: true },
    tuesday: { start: "09:00", end: "18:00", enabled: true },
    wednesday: { start: "09:00", end: "18:00", enabled: true },
    thursday: { start: "09:00", end: "18:00", enabled: true },
    friday: { start: "09:00", end: "18:00", enabled: true },
    saturday: { start: "09:00", end: "13:00", enabled: false },
    sunday: { start: "09:00", end: "13:00", enabled: false }
  });

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  const handleExport = () => {
    toast.success("Dados exportados com sucesso!");
    // Simular download
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify({ companyConfig, notifications, workingHours }, null, 2)], 
      { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "configuracoes-visao-clara.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.companyConfig) setCompanyConfig(data.companyConfig);
            if (data.notifications) setNotifications(data.notifications);
            if (data.workingHours) setWorkingHours(data.workingHours);
            toast.success("Configurações importadas com sucesso!");
          } catch (error) {
            toast.error("Erro ao importar configurações");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const dayNames = {
    monday: "Segunda-feira",
    tuesday: "Terça-feira", 
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Configurações
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie as configurações da sua central de controle
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImport} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informações da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Informações da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome da Empresa</Label>
              <Input
                value={companyConfig.name}
                onChange={(e) => setCompanyConfig({ ...companyConfig, name: e.target.value })}
                placeholder="Nome da sua empresa"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Telefone Principal
              </Label>
              <Input
                value={companyConfig.phone}
                onChange={(e) => setCompanyConfig({ ...companyConfig, phone: e.target.value })}
                placeholder="(XX) XXXXX-XXXX"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email de Contato
              </Label>
              <Input
                type="email"
                value={companyConfig.email}
                onChange={(e) => setCompanyConfig({ ...companyConfig, email: e.target.value })}
                placeholder="contato@empresa.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                value={companyConfig.website}
                onChange={(e) => setCompanyConfig({ ...companyConfig, website: e.target.value })}
                placeholder="www.empresa.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Endereço</Label>
              <Input
                value={companyConfig.address}
                onChange={(e) => setCompanyConfig({ ...companyConfig, address: e.target.value })}
                placeholder="Endereço completo"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">Receba resumos diários por email</p>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Notificações no WhatsApp</Label>
                <p className="text-sm text-muted-foreground">Alertas importantes via WhatsApp</p>
              </div>
              <Switch
                checked={notifications.whatsappNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, whatsappNotifications: checked })}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Sons de Alerta</Label>
                <p className="text-sm text-muted-foreground">Tocar som para novas mensagens</p>
              </div>
              <Switch
                checked={notifications.soundAlerts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, soundAlerts: checked })}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Notificações Desktop</Label>
                <p className="text-sm text-muted-foreground">Exibir pop-ups no desktop</p>
              </div>
              <Switch
                checked={notifications.desktopNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, desktopNotifications: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Horário de Funcionamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horário de Funcionamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-32">
                  <Label className="text-sm font-medium">
                    {dayNames[day as keyof typeof dayNames]}
                  </Label>
                </div>
                
                <Switch
                  checked={hours.enabled}
                  onCheckedChange={(checked) => 
                    setWorkingHours({
                      ...workingHours,
                      [day]: { ...hours, enabled: checked }
                    })
                  }
                />
                
                {hours.enabled && (
                  <>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={hours.start}
                        onChange={(e) => 
                          setWorkingHours({
                            ...workingHours,
                            [day]: { ...hours, start: e.target.value }
                          })
                        }
                        className="w-24"
                      />
                      <span className="text-muted-foreground">às</span>
                      <Input
                        type="time"
                        value={hours.end}
                        onChange={(e) => 
                          setWorkingHours({
                            ...workingHours,
                            [day]: { ...hours, end: e.target.value }
                          })
                        }
                        className="w-24"
                      />
                    </div>
                  </>
                )}
                
                {!hours.enabled && (
                  <span className="text-muted-foreground text-sm">Fechado</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          Restaurar Padrões
        </Button>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Todas as Configurações
        </Button>
      </div>
    </div>
  );
}