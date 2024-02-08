import { Status } from '@prisma/client';

interface status{
    NOVO: 'novo'
    EM_PROCESSAMENTO: 'Em processamento'
    ENVIADO: 'enviado'
    ENTREGUE: 'entregue'
}

export interface StatusOrder {
  status: Status;
}
