export enum ClientStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Blocked = 'blocked',
}

export const clientStatusTranslations: Record<ClientStatus, string> = {
  [ClientStatus.Active]: 'Ativo',
  [ClientStatus.Inactive]: 'Inativo',
  [ClientStatus.Pending]: 'Pendente',
  [ClientStatus.Blocked]: 'Bloqueado',
};

export interface Client {
  id: number;
  name: string;
  whatsapp: string;
  username: string;
  password?: string;
  plan: string;
  customValue: number;
  dueDate: string;
  dns: string;
  player: string;
  status: ClientStatus;
  notes: string;
}

export interface DnsLink {
    id: number;
    domain: string;
    clientCount: number;
    createdAt: string;
}

export interface Invoice {
    id: string;
    clientName: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
    paymentUrl: string;
}

export interface Device {
    id: number;
    name: string;
    notes: string;
    imageUrl: string;
    compatiblePlayers: string[];
    clientCount: number;
}

export enum MessageType {
  D_MINUS_3 = 'D-3',
  D_0 = 'D0'
}

export interface AutoMessage {
    id: number;
    type: MessageType;
    text: string;
    active: boolean;
}

export interface MessageLog {
    id: number;
    clientName: string;
    message: string;
    sentAt: string;
    status: 'sent' | 'failed';
    type: MessageType;
    error?: string;
}
