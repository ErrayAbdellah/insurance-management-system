export interface Client {
  id?: number;
  nom: string;
  email: string;
  telephone: string;
}

export interface Produit {
  id: number;
  code: string;
  libelle: string;
  type: string;
}

export interface Quote {
  id: number;
  client: Client;
  produit: Produit;
  montant: number;
  statut: 'DRAFT' | 'PENDING_MANAGER' | 'APPROVED' | 'REJECTED';
  dateCreation: string;
}

export interface Contract {
  id: number;
  quote: Quote;
  numeroContrat: string;
  dateEffet: string;
  statut: string;
}