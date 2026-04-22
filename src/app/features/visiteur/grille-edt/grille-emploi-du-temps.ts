import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeanceService } from '../../../core/services/seance.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { CoursService } from '../../../core/services/cours.service';
import { SalleService } from '../../../core/services/salle.service';
import { Seance } from '../../../core/services/seance';

@Component({
  selector: 'app-grille-edt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grille-emploi-du-temps.html',
  styleUrl: './grille-emploi-du-temps.css'
})
export class GrilleEdtComponent implements OnInit {
  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  creneauxHoraires = [
    { debut: '08:00', fin: '10:00' },
    { debut: '10:00', fin: '12:00' },
    { debut: '14:00', fin: '16:00' },
    { debut: '16:00', fin: '18:00' },
  ];

  seances: Seance[] = [];
  enseignants: any[] = [];
  cours: any[] = [];
  salles: any[] = [];
  classesDisponibles: string[] = [];

  filtreClasse     = 'M1-GDIL';
  filtreEnseignant = '';
  filtreCours      = '';

  detailSeance: Seance | null = null;

  constructor(
    private serviceSeance: SeanceService,
    private serviceEnseignant: EnseignantService,
    private serviceCours: CoursService,
    private serviceSalle: SalleService
  ) {}

  ngOnInit() {
    this.serviceSeance.getSeances().subscribe(donnees => this.seances = donnees);
    this.serviceEnseignant.getEnseignants().subscribe(donnees => this.enseignants = donnees);
    this.serviceCours.getCours().subscribe(donnees => this.cours = donnees);
    this.serviceSalle.getSalles().subscribe(donnees => this.salles = donnees);
    this.classesDisponibles = this.serviceSeance.getClasses();
  }

  obtenirSeancesPour(jour: string, heure: string): Seance[] {
    return this.seances.filter(seance =>
      seance.jour === jour &&
      seance.heure_debut === heure &&
      (!this.filtreClasse || seance.classe === this.filtreClasse) &&
      (!this.filtreEnseignant || seance.enseignant.includes(this.filtreEnseignant)) &&
      (!this.filtreCours || seance.cours.includes(this.filtreCours))
    );
  }

  classeSeance(type: string): string {
    return { cours:'cours-type', td:'td-type', tp:'tp-type', examen:'examen-type' }[type] || '';
  }

  ouvrirDetailSeance(seance: Seance) { this.detailSeance = seance; }
  fermerDetail() { this.detailSeance = null; }

  reinitialiserFiltres() {
    this.filtreClasse = 'M1-GDIL';
    this.filtreEnseignant = '';
    this.filtreCours = '';
  }
}
