// Fælles typer. Trip = én registreret hestetransport.
export interface Trip {
  id: string;
  from: string;
  to: string;
  legalOwner: string;
  numberOfHorses: number;
  date: string;
  departureTime: string;
  expectedDurationHours: number;
  expectedDurationMinutes: number;
  notes?: string;
}
