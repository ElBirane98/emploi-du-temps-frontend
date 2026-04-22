import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeanceService } from '../../../core/services/seance.service';
import { Seance } from '../../../core/services/seance';

@Component({
  selector: 'app-liste-seances',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-seances.html',
  styleUrl: './liste-seances.css'
})
export class ListeSeancesComponent implements OnInit {
  seances: Seance[] = [];
  filtre = '';

  constructor(private serviceSeance: SeanceService) {}

  ngOnInit() {
    this.serviceSeance.getSeances().subscribe(donnees => this.seances = donnees);
  }

  get seancesFiltrees() {
    const recherche = this.filtre.toLowerCase();
    return this.seances.filter(seance =>
      seance.cours.toLowerCase().includes(recherche) ||
      seance.enseignant.toLowerCase().includes(recherche) ||
      seance.classe.toLowerCase().includes(recherche)
    );
  }

  classeType(type: string): string {
    return { cours: 'cours', td: 'td', tp: 'tp', examen: 'examen' }[type] || 'cours';
  }
}
