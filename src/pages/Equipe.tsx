import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Plus,
  Mail,
  Phone,
  Shield,
  UserCheck,
  Clock,
  MessageSquare,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Equipe() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    role: "agent"
  });

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Carlos Silva",
      email: "carlos@empresa.com",
      phone: "(11) 9999-9999",
      role: "admin",
      status: "online",
      avatar: "CS",
      joinDate: "2024-01-15",
      chatsToday: 12,
      avgResponseTime: "2m 30s"
    },
    {
      id: 2,
      name: "Ana Santos",
      email: "ana@empresa.com",
      phone: "(11) 8888-8888",
      role: "agent",
      status: "online",
      avatar: "AS",
      joinDate: "2024-02-20",
      chatsToday: 8,
      avgResponseTime: "1m 45s"
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      phone: "(11) 7777-7777",
      role: "agent",
      status: "away",
      avatar: "PC",
      joinDate: "2024-03-10",
      chatsToday: 5,
      avgResponseTime: "3m 15s"
    }
  ]);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast.error("Nome e email são obrigatórios");
      return;
    }

    const newId = Math.max(...teamMembers.map(m => m.id)) + 1;
    const member = {
      id: newId,
      ...newMember,
      status: "offline",
      avatar: newMember.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0],
      chatsToday: 0,
      avgResponseTime: "0m 0s"
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: "", email: "", phone: "", role: "agent" });
    setShowAddDialog(false);
    toast.success("Membro adicionado com sucesso!");
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'agent': return 'Atendente';
      case 'supervisor': return 'Supervisor';
      default: return 'Atendente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Ausente';
      case 'busy': return 'Ocupado';
      default: return 'Offline';
    }
  };

  const totalChats = teamMembers.reduce((acc, member) => acc + member.chatsToday, 0);
  const onlineMembers = teamMembers.filter(member => member.status === 'online').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Gerenciar Equipe
          </h1>
          <p className="text-muted-foreground mt-2">
            Adicione ou remova membros da equipe e gerencie permissões
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Membro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Membro</DialogTitle>
              <DialogDescription>
                Preencha as informações do novo membro da equipe
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome *</Label>
                <Input
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="email@empresa.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  placeholder="(11) 9999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label>Função</Label>
                <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Atendente</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddMember}>Adicionar Membro</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total da Equipe</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">Membros ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Agora</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{onlineMembers}</div>
            <p className="text-xs text-muted-foreground">Disponíveis para atendimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atendimentos Hoje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalChats}</div>
            <p className="text-xs text-muted-foreground">Total da equipe</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2m 30s</div>
            <p className="text-xs text-muted-foreground">Resposta da equipe</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Membros da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">{member.chatsToday}</div>
                    <div className="text-xs text-muted-foreground">Chats hoje</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">{member.avgResponseTime}</div>
                    <div className="text-xs text-muted-foreground">Tempo médio</div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant={member.role === 'admin' ? 'default' : 'secondary'} className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {getRoleText(member.role)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getStatusText(member.status)}
                    </Badge>
                  </div>

                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                    <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium w-32">{member.name}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((member.chatsToday / 15) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary">{member.chatsToday}</span>
                  <span className="text-xs text-muted-foreground ml-1">chats</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}